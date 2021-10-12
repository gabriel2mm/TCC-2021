package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.UserRepository;

@RestController
@RequestMapping(value = "/api/permissions")
@CrossOrigin(origins = "*")
public class PermissionController {

	@Autowired
	private UserRepository userRepository;
	
	@GetMapping
	public @ResponseBody ResponseEntity<List<String>> getPermissionIntoLoggedUser(){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		
		List<String> authorities = new ArrayList<String>();
		if(user != null ) {
			return new ResponseEntity(user.getAuthorities().stream().map( a -> a.getAuthority()), HttpStatus.OK);
		}
		
		return new ResponseEntity(null, HttpStatus.NO_CONTENT);
		
	}
}
