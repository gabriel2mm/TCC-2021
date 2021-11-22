package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ocrfieldservice.core.entity.Activity;
import br.com.ocrfieldservice.core.entity.Capacity;
import br.com.ocrfieldservice.core.entity.Category;
import br.com.ocrfieldservice.core.entity.Complement;
import br.com.ocrfieldservice.core.entity.GroupUsers;
import br.com.ocrfieldservice.core.entity.Proof;
import br.com.ocrfieldservice.core.entity.SLA;
import br.com.ocrfieldservice.core.entity.Skill;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.enumerators.ActivityStatus;
import br.com.ocrfieldservice.core.repository.ActivityRepository;
import br.com.ocrfieldservice.core.repository.AddressRepository;
import br.com.ocrfieldservice.core.repository.CategoryRepository;
import br.com.ocrfieldservice.core.repository.ComplementRepository;
import br.com.ocrfieldservice.core.repository.GroupRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/activities")
public class ActivityController {

	@Autowired ActivityRepository repository;
	
	@Autowired UserRepository useRep;
	
	@Autowired CategoryRepository categoryRepository;
	
	@Autowired AddressRepository addressRepository;
	
	@Autowired ComplementRepository complementRepository;
	
	@Autowired GroupRepository groupRepository;
	
	
	@GetMapping
	public @ResponseBody ResponseEntity<List<Activity>> getAllByOrg(Authentication authentication){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<List<Activity>>(repository.getAll(userLogged.getOrganization()), HttpStatus.OK);
		}
		
		return new ResponseEntity<List<Activity>>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/{id}")
	public @ResponseBody ResponseEntity<Activity> getOneById(Authentication authentication, @PathVariable("id") Long id){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<Activity>(repository.getById(id), HttpStatus.OK);
		}
		
		return new ResponseEntity<Activity>(new Activity(), HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping
	public @ResponseBody ResponseEntity<String> createAcitivity(Authentication authentication, @RequestBody Activity activity){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			activity.setCreatedBy(userLogged);
			activity.setOrganization(userLogged.getOrganization());
			activity.setRequester(userLogged);
			activity.setStatus(ActivityStatus.ABERTO);
			
			Activity tmp = repository.getLastRecord();
			if(tmp != null) {
				activity.setNumber(padLeft(String.valueOf(tmp.getId() + 1), 8));
			}else {
				activity.setNumber(padLeft(String.valueOf(1), 8));
			}
			
			Proof proof = new Proof();
			proof.setCreatedBy(userLogged);
			proof.setRate(0);
			proof.setSignature("");
			activity.setProof(proof);
			
			Category category = categoryRepository.findOne(activity.getCategory().getId());
			if(category != null) {
				activity.setCategory(category);
				SLA sla = category.getSla();
				if(sla != null) {
					Calendar calendar = Calendar.getInstance();
					switch(sla.getUnity()){
						case "m":
							calendar.add(calendar.MINUTE, Integer.valueOf(sla.getTime()));
							break;
						case "h": 
							calendar.add(calendar.HOUR, Integer.valueOf(sla.getTime()));
							break;
						case "d": 
							calendar.add(calendar.DAY_OF_MONTH, Integer.valueOf(sla.getTime()));
							break;
						case "M": 
							calendar.add(calendar.MONTH, Integer.valueOf(sla.getTime()));
							break;
						case "S": 
							calendar.add(calendar.WEEK_OF_MONTH, Integer.valueOf(sla.getTime()));
							break;
						case "y": 
							calendar.add(calendar.YEAR, Integer.valueOf(sla.getTime()));
							break;
					}
					activity.setDateLimit(calendar.getTime());
					
					
					if(category.isAutomaticAssignment()) {						
						List<User> users = useRep.selectAssignedUser(category.getSkills(), category.getCapacities(), userLogged.getOrganization());
						if(users != null && users.size() > 0) {
							User assigned = repository.UserActivityAssigned(users, new Date(), activity.getDateLimit());
							if(assigned != null) {
								activity.setAssigned(assigned);
							}
						}
							
					}
					
				}
			}
			
			activity.getComplements().forEach(item -> item.setCreatedBy(userLogged));			
			activity.getAddress().setCreatedBy(userLogged);
			
			addressRepository.save(activity.getAddress());
			repository.save(activity);
			
			return new ResponseEntity<String>("Atividade criada com sucesso!", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("Não foi possível criar atividade!", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<String> updateActivity(Authentication authentication, @PathVariable("id") Long id, @RequestBody Activity activity){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			
			Activity tmp = repository.getById(id);
			if(tmp != null) {
				
				Set<Complement> complementsSet = new HashSet<Complement>();
				for(Complement complement : activity.getComplements()) {
					Complement tmpComplement = complementRepository.getById(complement.getId());
					if(tmpComplement != null) {
						complementsSet.add(tmpComplement);
					}else {
						complement.setCreatedBy(userLogged);
						complementsSet.add(complement);
					}
				}
				
				
				tmp.setComplements(complementsSet);
				
				
				if(tmp.getProof() == null) {
					tmp.setProof(new Proof());
				}
				
				tmp.getProof().setRate(activity.getProof().getRate());
				tmp.getProof().setActivity(tmp);
				tmp.getProof().setSignature(activity.getProof().getSignature());
				
				if(ActivityStatus.CONCLUIDO.equals(tmp.getStatus())) {
					tmp.setStatus(ActivityStatus.FECHADO);
				}else {
					tmp.setStatus(activity.getStatus());
				}
			
				
				if(activity.getAssigned() != null) {
					User tmpUser = useRep.findById(activity.getAssigned().getId());

					if(tmpUser != null) {
						Set<Activity> activities = tmpUser.getActivities();
						activities.add(tmp);
						tmpUser.setActivities(activities);
						useRep.save(tmpUser);
						tmp.setAssigned(tmpUser);
					}
				}
				
				
				//tmp.setProof(activity.getProof());
				
				repository.update(tmp);
				return new ResponseEntity<String>("Atualizado com sucesso!!!", HttpStatus.OK);
			}
		}
		
		return new ResponseEntity<String>("Não foi possível atualizar atividade!", HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/status-activity/{id}")
	public @ResponseBody ResponseEntity<String> setStatusActivity(Authentication authentication, @PathVariable("id") Long id, @RequestParam("status") ActivityStatus status){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			Activity tmp = repository.getById(id);
			if(tmp != null) {
				tmp.setStatus(status);
				if(tmp.getStatus() == ActivityStatus.CONCLUIDO) {
					tmp.setDateClosed(new Date());
				}
				repository.save(tmp);
				return new ResponseEntity<String>("Atualizado com sucesso!!!", HttpStatus.OK);
			}
		}
		
		return new ResponseEntity<String>("Não foi possível atualizar atividade!", HttpStatus.BAD_REQUEST);
	}
	
	
	@GetMapping("/my-activities")
	public @ResponseBody ResponseEntity<List<Activity>> getMyActivities(Authentication authentication){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<List<Activity>>(repository.getMyRecords(userLogged.getId()) , HttpStatus.OK);
		}
		
		return new ResponseEntity<List<Activity>>( new ArrayList<>() , HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/search")
	public @ResponseBody ResponseEntity<List<Activity>> searchActivity(Authentication authentication, @RequestParam("value") String value){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<List<Activity>>(repository.searchActivity(value) , HttpStatus.OK);
		}
		
		return new ResponseEntity<List<Activity>>( new ArrayList<>() , HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/queue")
	public @ResponseBody ResponseEntity<List<Activity>> queueActivity(Authentication authentication){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<List<Activity>>(repository.queueAcitivity(userLogged.getOrganization().getId()) , HttpStatus.OK);
		}
		
		return new ResponseEntity<List<Activity>>( new ArrayList<>() , HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/all/organization")
	public @ResponseBody ResponseEntity<List<Activity>> getAllAticitiesOrganization(Authentication authentication, @RequestParam("date") String date){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			Date tmpDate = new Date();
			tmpDate.setTime(Long.parseLong(date));
			return new ResponseEntity<List<Activity>>(repository.getAllBetweenDate(userLogged.getOrganization(), tmpDate) , HttpStatus.OK);
		}
		
		return new ResponseEntity<List<Activity>>( new ArrayList<>() , HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/all/group-or-user")
	public @ResponseBody ResponseEntity<List<Activity>> getAllAticitiesOrganization(Authentication authentication, @RequestParam("date") String date, @RequestParam("type") String type, @RequestParam("id") Long id){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			
			List<User> users = new ArrayList<User>();
			if("u".equals(type.toLowerCase()))
			{
				User usertmp = useRep.findById(id);
				users.add(usertmp);
			}else if("g".equals(type.toLowerCase())) {
				GroupUsers group = groupRepository.findOne(id);
				users = group.getUsers().stream().collect(Collectors.toList());
			}
			Date tmpDate = new Date();
			tmpDate.setTime(Long.parseLong(date));
				
			return new ResponseEntity<List<Activity>>(repository.getAllBetweenDateAndUserList(userLogged.getOrganization(), tmpDate, users) , HttpStatus.OK);
		}
		
		return new ResponseEntity<List<Activity>>( new ArrayList<>() , HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/status")
	public @ResponseBody ResponseEntity<String[]> getAllStatus(Authentication authentication){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<String[]>( new String[] { String.valueOf(repository.countStatusOpen(userLogged.getOrganization())), String.valueOf(repository.countStatusCurrent(userLogged.getOrganization())), String.valueOf(repository.countStatusClosed(userLogged.getOrganization())), String.valueOf(repository.countStatusLate(userLogged.getOrganization()))}  , HttpStatus.OK);
		}
		
		return new ResponseEntity<String[]>( new String[0] , HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/category-count")
	public @ResponseBody ResponseEntity<List<Object[]>> getCategoryCount(Authentication authentication){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<List<Object[]>>( repository.countCategory(userLogged.getOrganization()) , HttpStatus.OK);
		}
		
		return new ResponseEntity<List<Object[]>>( new ArrayList<>() , HttpStatus.BAD_REQUEST);
	}
	
	
	@GetMapping("/skills-count")
	public @ResponseBody ResponseEntity<List<Object[]>> getSkillsCount(Authentication authentication){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<List<Object[]>>( repository.countSkills(userLogged.getOrganization()) , HttpStatus.OK);
		}
		
		return new ResponseEntity<List<Object[]>>( new ArrayList<>() , HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/capacity-count")
	public @ResponseBody ResponseEntity<List<Object[]>> getCapacityCount(Authentication authentication){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<List<Object[]>>( repository.countCapacity(userLogged.getOrganization()) , HttpStatus.OK);
		}
		
		return new ResponseEntity<List<Object[]>>( new ArrayList<>() , HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/history-activities")
	public @ResponseBody ResponseEntity<List<List<Object[]>>> getHistoryActivity(Authentication authentication){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			List<Object[]> closed = repository.historyActivitiesClosed(userLogged.getOrganization());
			List<Object[]> lated = repository.historyActivitiesLated(userLogged.getOrganization());
			
			List<List<Object[]>> results = new ArrayList<>();
			results.add(closed);
			results.add(lated);
			
			return new ResponseEntity<List<List<Object[]>>>( results , HttpStatus.OK);
		}
		
		return new ResponseEntity<List<List<Object[]>>>( new ArrayList<>() , HttpStatus.BAD_REQUEST);
	}
	


	public static String padLeft(String s, int n) {
	    return String.format("WO%" + n + "s", s).replace(' ', '0');  
	}
	
	
}
