package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	private UserRepository repository;
	
	@Autowired
	private SLARepository slaRepository;
	
	@GetMapping
	private @ResponseBody ResponseEntity<List<SLA>> getAllSlas(){
		final User user = repository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			return new ResponseEntity<List<SLA>>(slaRepository.findByOrg(user.getOrganization()), HttpStatus.OK);
		}
		
		return new ResponseEntity<List<SLA>>(new ArrayList<>(), HttpStatus.OK);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:sla')")
	public @ResponseBody ResponseEntity<String> createSLA(@RequestBody SLA sla){
		
		final User userLogged = repository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(userLogged != null) {
			sla.setActive(true);
			sla.setCreatedBy(userLogged);
			sla.setOrganization(userLogged.getOrganization());
			slaRepository.save(sla);
			
			return new ResponseEntity<String>("SLA criado com sucesso!", HttpStatus.OK);
		}
		return new ResponseEntity<String>("Não foi possível criar sla!", HttpStatus.BAD_REQUEST);
	}
}
