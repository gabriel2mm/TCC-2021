package br.com.ocrfieldservice.entrypoint.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.UserRepository;
import br.com.ocrfieldservice.entrypoint.viewModel.ChangePasswordProfile;

@RestController
@RequestMapping(value = "/api/users")
@CrossOrigin(allowCredentials = "", allowedHeaders = "")
public class UserController {

	@Autowired
	private UserRepository repository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:user') or hasAuthority('write:user')")
	public @ResponseBody ResponseEntity<List<User>> getUsers() {
		User user = repository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if (user != null && user.getOrganization() != null) {
			return new ResponseEntity<List<User>>(repository.findByOrg(user.getOrganization()), HttpStatus.OK);
		}
		return new ResponseEntity<List<User>>(new ArrayList<>(), HttpStatus.NO_CONTENT);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:user') or hasAuthority('write:user')")
	public @ResponseBody ResponseEntity<User> getUserById(@PathVariable("id") long id) {
		User user = repository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if (user != null) {

			User tmp = repository.findById(id);

			if (user.getOrganization() != null && tmp.getOrganization() != null
					&& user.getOrganization() == tmp.getOrganization()) {
				return new ResponseEntity<User>(tmp, HttpStatus.OK);
			}

		}
		return new ResponseEntity<User>(new User(), HttpStatus.NO_CONTENT);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:user')")
	public @ResponseBody ResponseEntity<String> createUser(@RequestBody User user) {
		User userLogged = repository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		String userpassword = user.getPassword();

		if (userLogged != null && userLogged.getOrganization() != null) {
			Long limit = Long.valueOf(userLogged.getOrganization().getLimitLicenses());
			Long licenses = repository.countUsersByOrganizationId(userLogged.getOrganization().getId());

			if (licenses <= limit) {
				user.setOrganization(userLogged.getOrganization());
				user.setPassword(passwordEncoder.encode(userpassword));
				repository.save(user);
				return new ResponseEntity<String>("Criado com sucesso!", HttpStatus.CREATED);
			} else {
				return new ResponseEntity<String>(
						"Não é possível criar mais usuários. Você estorou o limite de licenças!",
						HttpStatus.BAD_REQUEST);
			}
		}
		return new ResponseEntity<String>("Não foi possível criar usuário!", HttpStatus.BAD_REQUEST);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:user')")
	public @ResponseBody ResponseEntity<String> updateUser(@PathVariable("id") Long id, @RequestBody User user) {

		User userLogged = repository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());

		if (userLogged != null && userLogged.getOrganization() != null && user != null) {
			User tmp = repository.findById(id);
			if (tmp != null) {
				tmp.setFirstName(user.getFirstName() != null ? user.getFirstName() : tmp.getFirstName());
				tmp.setLastName(user.getLastName() != null ? user.getLastName() : tmp.getLastName());
				tmp.setEmail(user.getEmail() != null ? user.getEmail() : tmp.getEmail());
				tmp.setCPF(user.getCPF() != null ? user.getCPF() : tmp.getCPF());

				repository.save(tmp);

				return new ResponseEntity<String>("Usuário atualizado com sucesso!", HttpStatus.OK);
			}
		}
		return new ResponseEntity<String>("Não foi possível atualizar usuário", HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:user')")
	public @ResponseBody ResponseEntity<String> deletedUser(@PathVariable("id") Long id) {

		User userLogged = repository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		User user = repository.findById(id);

		if (user != null && user.getOrganization() != null && userLogged != null
				&& userLogged.getOrganization() == user.getOrganization()) {
			repository.deleteById(id);
			return new ResponseEntity<String>("Usuário deleteado com sucesso!", HttpStatus.OK);
		}

		return new ResponseEntity<String>("Não foi possível deletar usuário", HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("/change-password")
	public @ResponseBody ResponseEntity<String> changePasswordProfile(@RequestBody ChangePasswordProfile changePasswordProfile){
		User userLogged = repository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(userLogged != null && userLogged.getEmail().equals(changePasswordProfile.getEmail())) {
			User tmp = repository.findByEmail(changePasswordProfile.getEmail());
			
			if(tmp != null && passwordEncoder.matches(changePasswordProfile.getCurrentPassword(), tmp.getPassword())) {
				tmp.setPassword(passwordEncoder.encode(changePasswordProfile.getNewPassword()));
				repository.save(tmp);
				
				return new ResponseEntity<String>("Atualizado com sucesso!", HttpStatus.OK);
			}
		}
		
		return new ResponseEntity<String>("Não foi possível atualizar senha", HttpStatus.BAD_REQUEST);
	}
}
