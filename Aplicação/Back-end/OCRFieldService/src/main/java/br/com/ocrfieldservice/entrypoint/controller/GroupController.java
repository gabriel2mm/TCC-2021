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

import br.com.ocrfieldservice.core.entity.GroupUsers;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.GroupRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@RestController
@RequestMapping(value = "/api/groups")
@CrossOrigin(origins = "*")
public class GroupController {

	@Autowired
	private GroupRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:group') or hasAuthority('write:group')")
	public @ResponseBody ResponseEntity<List<GroupUsers>> getGroups(){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null && user.getOrganization() != null)
			return new ResponseEntity<List<GroupUsers>>(repository.findByOrg(user.getOrganization()), HttpStatus.OK);
		
		
		return new ResponseEntity<List<GroupUsers>>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}
	
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:group') or hasAuthority('write:group')")
	public ResponseEntity<GroupUsers> getGroupById(@PathVariable("id") final Long id) {
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		GroupUsers group = repository.findOne(id);
		
		if(user != null && group != null) {			
			return new ResponseEntity<GroupUsers>(group, HttpStatus.OK);
		}
		
		return new ResponseEntity<GroupUsers>(new GroupUsers(),  HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:group')")
	public ResponseEntity<HttpStatus> deleteGroup(@PathVariable("id") Long id){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		GroupUsers group = repository.findOne(id);
		if(user != null && group != null) {
			repository.deleteId(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}
		
		return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:group')")
	private ResponseEntity<String> createGroup(@RequestBody GroupUsers group){
	
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			repository.save(group);
			return new ResponseEntity<String>("Não foi possível criar grupo!", HttpStatus.BAD_REQUEST);
		}
		
		
		return new ResponseEntity<String>("Não foi possível criar grupo!", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:group')")
	private ResponseEntity<String> updateGroup(@PathVariable("id") Long id,@RequestBody GroupUsers group){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			GroupUsers tmp = repository.findOne(group.getId());
			if(tmp != null) {
				tmp.setName(group.getName() != null ? group.getName() : tmp.getName());
				tmp.setDescription(group.getDescription() != null ? group.getDescription() : tmp.getDescription());
				tmp.setUsers(group.getUsers() != null ? group.getUsers() : tmp.getUsers());
				
				repository.update(group);
				
				return new ResponseEntity<String>("Grupo atualizado com sucesso!", HttpStatus.BAD_REQUEST);
			}
		}
		
		return new ResponseEntity<String>("Não foi possível Atualizar grupo", HttpStatus.BAD_REQUEST);
	}
}
