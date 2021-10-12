package br.com.ocrfieldservice.entrypoint.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.UserRepository;

@RestController
@RequestMapping(value = "/api/users")
@CrossOrigin(allowCredentials = "", allowedHeaders = "")
@PreAuthorize("hasAuthority('Admin')")
public class UserController {

	@Autowired
	private UserRepository repository;
	
	@GetMapping
	public @ResponseBody ResponseEntity<Collection<User>> users() {
		
	

		System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());
		
		return new ResponseEntity<Collection<User>>(repository.findAll(), HttpStatus.OK);
	}
}
