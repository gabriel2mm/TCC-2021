package br.com.ocrfieldservice.entrypoint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ocrfieldservice.core.repository.UserRepository;
import br.com.ocrfieldservice.dataprovider.entity.User;
import br.com.ocrfieldservice.entrypoint.adapter.UserAdapter;
import br.com.ocrfieldservice.entrypoint.request.SignRequest;

@RestController
@RequestMapping(value = "/api/users")
public class UserController {

	@Autowired
	private UserAdapter userAdapter;
	
	@Autowired
	private UserRepository repository;
	
	@GetMapping
	@ResponseBody
	public String doGet() {
		return "Olá mundo dos users";
	}
	
	@PostMapping(value = "/sign")
	public User Sigin(@RequestBody SignRequest request) {
		User user = userAdapter.toUser(request);
		user.setFirstName("Gabriel");
		user.setLastName("Maia");
		
		return repository.save(user);
	}
}
