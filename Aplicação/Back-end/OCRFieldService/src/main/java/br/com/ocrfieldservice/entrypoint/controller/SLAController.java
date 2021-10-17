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

import br.com.ocrfieldservice.core.entity.SLA;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.SLARepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@RestController
@RequestMapping(value = "/api/sla")
@CrossOrigin(origins = "*")
public class SLAController {

	@Autowired
	private SLARepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:sla') or hasAuthority('write:sla')")
	public @ResponseBody ResponseEntity<List<SLA>> getSlas(){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null && user.getOrganization() != null)
			return new ResponseEntity<List<SLA>>(repository.findByOrg(user.getOrganization()), HttpStatus.OK);
		
		
		return new ResponseEntity<List<SLA>>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}
	
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:sla') or hasAuthority('write:sla')")
	public ResponseEntity<SLA> getSlaById(@PathVariable("id") final Long id) {
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		SLA sla = repository.findOne(id);
		
		if(user != null && sla != null) {			
			return new ResponseEntity<SLA>(sla, HttpStatus.OK);
		}
		
		return new ResponseEntity<SLA>(new SLA(),  HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:sla')")
	public ResponseEntity<HttpStatus> deleteSla(@PathVariable("id") Long id){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		SLA sla = repository.findOne(id);
		if(user != null && sla != null) {
			repository.deleteId(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}
		
		return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:sla')")
	private ResponseEntity<String> createSla(@RequestBody SLA sla){
	
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			repository.save(sla);
			return new ResponseEntity<String>("Não foi possível criar SLA!", HttpStatus.BAD_REQUEST);
		}
		
		
		return new ResponseEntity<String>("Não foi possível criar SLA!", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:sla')")
	private ResponseEntity<String> updateSla(@PathVariable("id") Long id,@RequestBody SLA sla){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			SLA tmp = repository.findOne(sla.getId());
			if(tmp != null) {
				tmp.setName(sla.getName() != null ? sla.getName() : tmp.getName());
				tmp.setDescription(sla.getDescription() != null ? sla.getDescription() : tmp.getDescription());
				tmp.setActive(sla.isActive());
				tmp.setOrganization(user.getOrganization());
				tmp.setTime(sla.getTime() != null ? sla.getTime() : tmp.getTime());
				tmp.setUnity(sla.getUnity() != null ? sla.getUnity() : tmp.getUnity());
				
				repository.update(sla);
				
				return new ResponseEntity<String>("SLA atualizado com sucesso!", HttpStatus.BAD_REQUEST);
			}
		}
		
		return new ResponseEntity<String>("Não foi possível Atualizar SLA", HttpStatus.BAD_REQUEST);
	}
}
