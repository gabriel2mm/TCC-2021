package br.com.ocrfieldservice.entrypoint.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ocrfieldservice.core.repository.UserRepository;
import br.com.ocrfieldservice.dataprovider.entity.User;

@RestController
@RequestMapping(value = "/api/users")
@CrossOrigin(allowCredentials = "", allowedHeaders = "")
public class UserController {

	@Autowired
	private UserRepository repository;
	
	@GetMapping
	public @ResponseBody ResponseEntity<Collection<User>> users() {
		return new ResponseEntity<Collection<User>>(repository.findAll(), HttpStatus.OK);
	}
}
