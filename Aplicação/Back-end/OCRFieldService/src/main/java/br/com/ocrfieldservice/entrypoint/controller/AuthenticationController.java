package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.UserRepository;
import br.com.ocrfieldservice.core.usecase.SignIn;
import br.com.ocrfieldservice.entrypoint.viewModel.SignRequest;
import br.com.ocrfieldservice.entrypoint.viewModel.TokenResponse;

@RestController
@RequestMapping(value = "/api/auth")
@CrossOrigin(allowCredentials = "", allowedHeaders = "")
public class AuthenticationController {


	@Autowired
	private SignIn signIn;

	@Autowired
	private UserRepository repository;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Value("${jwt.secret}")
	private String secret;
	
	@Value("${jwt.token-expired}")
	private long expiration;
	
	
	@GetMapping
	private @ResponseBody ResponseEntity<String> createUserTeste(){
		User user = new User();
		user.setActive(true);
		user.setPassword(passwordEncoder.encode("teste"));
		user.setEmail("teste@teste.com");
		user.setFirstName("teste");
		user.setLastName("teste");
		
		repository.save(user);
		
		return new ResponseEntity<String>("Criado com sucesso!", HttpStatus.OK);
	}
	
	@PostMapping
	private @ResponseBody ResponseEntity<TokenResponse> signIn(@RequestBody SignRequest signRequest) {
		
		User user = repository.findByEmail(signRequest.getEmail());
		if(user != null && signIn.sigin(signRequest.getPassword(), user.getPassword())) {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signRequest.getEmail(), signRequest.getPassword(), new ArrayList<>()));
			
			String token = JWT.create()
					.withSubject(user.getUsername())
					.withExpiresAt(new Date(System.currentTimeMillis() + expiration))
					.sign(Algorithm.HMAC512(this.secret.getBytes()));
			
			return new ResponseEntity<TokenResponse>(new TokenResponse.Builder().token(token).type("Bearer").build(), HttpStatus.OK);
		}
		
		return new ResponseEntity<TokenResponse>(new TokenResponse.Builder().token("").type("").erros(new ArrayList<String>() {{ add("Usuário e/ou senha inválidos");}}).build(), HttpStatus.OK);
		
	}
}
