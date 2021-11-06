package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ocrfieldservice.core.entity.Capacity;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.CapacityRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/capacities")
public class CapacityController {

	@Autowired CapacityRepository repository;
	
	@Autowired UserRepository useRep;
	
	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:capacity') or hasAuthority('write:capacity')")
	public @ResponseBody ResponseEntity<List<Capacity>> getAllCapacities(Authentication authentication){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<List<Capacity>>(repository.findByOrg(userLogged.getOrganization()) , HttpStatus.OK);
		}
		
		return new ResponseEntity<List<Capacity>>(new ArrayList<>() , HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:capacity') or hasAuthority('write:capacity')")
	public @ResponseBody ResponseEntity<Capacity> getOneCapacity(Authentication authentication, @PathVariable("id") long id){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<Capacity>(repository.findOne(id) , HttpStatus.OK);
		}
		
		return new ResponseEntity<Capacity>(new Capacity() , HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:capacity')")
	public @ResponseBody ResponseEntity<String>  deleteCapacity(Authentication authentication, @PathVariable("id") long id){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			repository.deleteId(id);
			return new ResponseEntity<String>("Deletado com sucesso!", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("Falha ao deletar Capacidade!", HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:capacity')")
	public @ResponseBody ResponseEntity<String> createCapacity(Authentication authentication, @RequestBody Capacity capacity){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			capacity.setActive(true);
			capacity.setCreatedBy(userLogged);
			capacity.setOrganization(userLogged.getOrganization());
			
			repository.save(capacity);
			return new ResponseEntity<String>("Criado com sucesso!", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("Falha ao criar capacidade!", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:capacity')")
	public @ResponseBody ResponseEntity<String> updateCapacity(Authentication authentication, @PathVariable("id") long id, @RequestBody Capacity capacity){
		User userLogged = useRep.findByEmail(authentication.getName());
		
		Capacity capacityTmp = repository.findOne(id);
		if(userLogged != null && userLogged.getOrganization() != null && capacityTmp!= null) {
			capacityTmp.setActive(capacity.isActive());
			capacityTmp.setName(capacity.getName());
			capacityTmp.setDescription(capacity.getDescription());
			capacityTmp.setCreatedBy(userLogged);
			capacityTmp.setOrganization(userLogged.getOrganization());
			
			Set<User> users = new HashSet<>();
			for(User user : capacity.getUsers()) {
				User tmp = useRep.findById(user.getId());
				if(tmp != null) {
					users.add(tmp);
				}
			}
			
			capacityTmp.setUsers(users);
			repository.save(capacityTmp);
			
			return new ResponseEntity<String>("Atualizado com sucesso!", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("Falha ao Atualizar capacidade!", HttpStatus.BAD_REQUEST);
	}
}