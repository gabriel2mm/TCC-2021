package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
import br.com.ocrfieldservice.core.entity.Category;
import br.com.ocrfieldservice.core.entity.Complement;
import br.com.ocrfieldservice.core.entity.SLA;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.enumerators.ActivityStatus;
import br.com.ocrfieldservice.core.repository.ActivityRepository;
import br.com.ocrfieldservice.core.repository.AddressRepository;
import br.com.ocrfieldservice.core.repository.CategoryRepository;
import br.com.ocrfieldservice.core.repository.ComplementRepository;
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
				
				if(activity.getAssigned() != null) {
					User tmpUser = useRep.findById(activity.getAssigned().getId());
					if(tmpUser != null) {
						tmp.setAssigned(tmpUser);
					}
				}
				
				tmp.setStatus(activity.getStatus());
				//tmp.setProof(activity.getProof());
				
				repository.update(tmp);
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
	/*
	@GetMapping("/dashboard/aberto")
	public @ResponseBody ResponseEntity<String> nomeDoMetodo(Authentication authentication){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<String>("1, 2, 3, 4, 5", HttpStatus.OK);
		}
		return new ResponseEntity<String>("0", HttpStatus.BAD_REQUEST);
	}*/
	
	@GetMapping("/dashboard/aberto")
	public Map<String, List<Integer>> testeDeString(Authentication authentication){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			List<Integer> openList = new ArrayList<Integer>();
			openList.add(1);
			openList.add(3);
			openList.add(5);
			openList.add(7);
			openList.add(12);
			openList.add(18);
			openList.add(22);
			openList.add(27);
			openList.add(30);
			openList.add(20);
			openList.add(12);
			openList.add(3);
			
			List<Integer> inProgressList = new ArrayList<Integer>();
			inProgressList.add(5);
			inProgressList.add(0);
			inProgressList.add(9);
			inProgressList.add(10);
			inProgressList.add(14);
			inProgressList.add(21);
			inProgressList.add(3);
			inProgressList.add(9);
			inProgressList.add(15);
			inProgressList.add(28);
			inProgressList.add(20);
			inProgressList.add(4);
			
			List<Integer> finishedDayList = new ArrayList<Integer>();
			finishedDayList.add(20);
			finishedDayList.add(18);
			finishedDayList.add(16);
			finishedDayList.add(14);
			finishedDayList.add(22);
			finishedDayList.add(24);
			finishedDayList.add(26);
			finishedDayList.add(28);
			finishedDayList.add(30);
			finishedDayList.add(10);
			finishedDayList.add(15);
			finishedDayList.add(5);
			
			List<Integer> expiredList = new ArrayList<Integer>();
			expiredList.add(15);
			expiredList.add(12);
			expiredList.add(10);
			expiredList.add(9);
			expiredList.add(8);
			expiredList.add(7);
			expiredList.add(6);
			expiredList.add(5);
			expiredList.add(4);
			expiredList.add(3);
			expiredList.add(2);
			expiredList.add(1);
			Map<String, List<Integer>> map = new HashMap<>();
			map.put("openActivities", openList);
			map.put("inProgressActivities", inProgressList);
			map.put("finishedDayActivities", finishedDayList);
			map.put("expiredActivities", expiredList);
			return map;
		}
		Map<String, List<Integer>> map = new HashMap<>();
		map.put("Erro", map.get("Deu ruim!"));
		return map;
	}


	public static String padLeft(String s, int n) {
	    return String.format("WO%" + n + "s", s).replace(' ', '0');  
	}
	
	
}
