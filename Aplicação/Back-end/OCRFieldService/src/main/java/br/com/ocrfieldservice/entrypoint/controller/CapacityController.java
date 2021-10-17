package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
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

@RestController
@RequestMapping(value = "/api/capacities")
@CrossOrigin(origins = "*")
public class CapacityController {

	@Autowired
	private CapacityRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:capacity') or hasAuthority('write:capacity')")
	public @ResponseBody ResponseEntity<List<Capacity>> getCapacitys(){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null && user.getOrganization() != null)
			return new ResponseEntity<List<Capacity>>(repository.findByOrg(user.getOrganization()), HttpStatus.OK);
		
		
		return new ResponseEntity<List<Capacity>>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}
	
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:capacity') or hasAuthority('write:capacity')")
	public ResponseEntity<Capacity> getCapacityById(@PathVariable("id") final Long id) {
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Capacity capacity = repository.findOne(id);
		
		if(user != null && capacity != null) {			
			return new ResponseEntity<Capacity>(capacity, HttpStatus.OK);
		}
		
		return new ResponseEntity<Capacity>(new Capacity(),  HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:capacity')")
	public ResponseEntity<HttpStatus> deleteCapacity(@PathVariable("id") Long id){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Capacity capacity = repository.findOne(id);
		if(user != null && capacity != null) {
			repository.deleteId(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}
		
		return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:capacity')")
	private ResponseEntity<String> createCapacity(@RequestBody Capacity capacity){
	
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			repository.save(capacity);
			return new ResponseEntity<String>("Não foi possível criar Capacity!", HttpStatus.BAD_REQUEST);
		}
		
		
		return new ResponseEntity<String>("Não foi possível criar Capacity!", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:capacity')")
	private ResponseEntity<String> updateCapacity(@PathVariable("id") Long id,@RequestBody Capacity capacity){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			Capacity tmp = repository.findOne(capacity.getId());
			if(tmp != null) {
				tmp.setName(capacity.getName() != null ? capacity.getName() : tmp.getName());
				tmp.setDescription(capacity.getDescription() != null ? capacity.getDescription() : tmp.getDescription());
				tmp.setActive(capacity.isActive());
				tmp.setOrganization(user.getOrganization());
				tmp.setCategory(capacity.getCategory() != null ? capacity.getCategory() : tmp.getCategory());
				tmp.setUsers(capacity.getUsers() != null ? capacity.getUsers() : tmp.getUsers());
				repository.update(capacity);
				
				return new ResponseEntity<String>("Capacity atualizado com sucesso!", HttpStatus.BAD_REQUEST);
			}
		}
		
		return new ResponseEntity<String>("Não foi possível Atualizar Capacity", HttpStatus.BAD_REQUEST);
	}
}
