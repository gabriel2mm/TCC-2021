package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import br.com.ocrfieldservice.core.entity.TokenIntegration;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.TokenIntegrationRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@RestController
@RequestMapping(value = "/api/tokens")
@CrossOrigin(origins = "*")
public class TokenIntegrationController {
	
	@Autowired
	private TokenIntegrationRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Value("${jwt.secret}")
	private String secret;
	
	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('integration')")
	public @ResponseBody ResponseEntity<List<TokenIntegration>> getToken(){
		User userLogged = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<List<TokenIntegration>>(repository.getAllByOrganization(userLogged.getOrganization().getId()), HttpStatus.OK);
		}
		
		return new ResponseEntity<List<TokenIntegration>>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('integration')")
	public @ResponseBody ResponseEntity<String> createToken(@RequestBody TokenIntegration token){
		User userLogged = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			
			String tkn = JWT.create().withSubject(userLogged.getUsername())
					.withExpiresAt(new Date(System.currentTimeMillis() + 15768000000L))
					.sign(Algorithm.HMAC512(this.secret.getBytes()));
			
			token.setCreatedBy(userLogged);
			token.setOrg(userLogged.getOrganization());
			token.setToken(tkn);
			repository.Save(token);
		}
		
		return new ResponseEntity<String>("Token creado com sucesso!", HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('integration')")
	public @ResponseBody ResponseEntity<String> deleteToken(@PathVariable("id") long id){
		User userLogged = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			repository.DeleteToken(id);
		}
		
		return new ResponseEntity<String>("Registro deletado com sucesso!" , HttpStatus.OK);
	}
}
