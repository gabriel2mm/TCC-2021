package br.com.ocrfieldservice.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.ocrfieldservice.contracts.SignInService;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.UserRepository;
import br.com.ocrfieldservice.entrypoint.viewModel.SignRequest;
import br.com.ocrfieldservice.entrypoint.viewModel.TokenResponse;

@Component
@Order(value = Ordered.HIGHEST_PRECEDENCE)
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;
	
	@Value("${jwt.secret}")
	private String secret;
	
	@Value("${jwt.token-expired}")
	private long expiration;
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private SignInService signIn;
	
	
	public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
	
	@Override
	@Autowired
	public void setAuthenticationManager(AuthenticationManager authenticationManager) {
	    super.setAuthenticationManager(authenticationManager);
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
		try {
			SignRequest signRequest = new ObjectMapper().readValue(request.getInputStream(), SignRequest.class);
			
			User user = repository.findByEmail(signRequest.getEmail());
			if(user != null && signIn.sigin(signRequest.getPassword(), user.getPassword())) {
				return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signRequest.getEmail(), signRequest.getPassword(), user.getProfile().getPermissions()));
			}
		} catch (JsonParseException | JsonMappingException e) {
			logger.error("Não foi possível converter json para user");
		} catch (IOException e) {
			logger.error("Não foi possível ler o conteúdo da requisição");
		}
		
		throw new RuntimeException("Não foi possível realizar a autenticação");
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		User user = (User) authResult.getPrincipal();
		
		String token = JWT.create()
				.withSubject(user.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis() + expiration))
				.sign(Algorithm.HMAC512(this.secret.getBytes()));
		
		response.getWriter().write(new ObjectMapper().writeValueAsString(new TokenResponse.Builder().token(token).type("Bearer").erros(new ArrayList<>()).build()));
		response.getWriter().flush();
	}
	
	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
		
		response.setStatus(403);
		response.setContentType("application/json; charset=UTF-8");
		response.getWriter().write(new ObjectMapper().writeValueAsString(new TokenResponse.Builder().token("").type("").erros(new ArrayList<String>() {{ add("Usuário e/ou senha inválidos"); }}).build()));
		response.getWriter().flush();
	}
	
}
