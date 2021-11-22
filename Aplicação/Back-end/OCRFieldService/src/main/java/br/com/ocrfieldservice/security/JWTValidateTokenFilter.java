package br.com.ocrfieldservice.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.ocrfieldservice.core.entity.Errors;
import br.com.ocrfieldservice.core.entity.User;
import io.jsonwebtoken.JwtException;

@Component
public class JWTValidateTokenFilter extends BasicAuthenticationFilter {

	@Value("${jwt.secret}")
	private String secret;

	private static final String HEADER = "Authorization";
	private static final String PREFIX = "Bearer ";

	@Autowired
	private UserDetailService userDetailService;

	public JWTValidateTokenFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
		String authorizationHeader = request.getHeader(HEADER);
		
		 response.setHeader("Access-Control-Max-Age", "3600");
		 response.setHeader("Content-Security-Policy", "upgrade-insecure-requests");
		
		try {
			if(authorizationHeader != null && authorizationHeader.startsWith(PREFIX)) {
				String token = authorizationHeader.replace(PREFIX, "");
				String email = JWT.decode(token).getSubject();
				User user = (User) userDetailService.loadUserByUsername(email);
				DecodedJWT decoded = JWT.require(Algorithm.HMAC512(this.secret)).build().verify(token);

				if(user != null && decoded != null) {
					UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), user.getAuthorities());
					SecurityContextHolder.getContext().setAuthentication(authenticationToken);
					chain.doFilter(request, response);
				}
			}else {
				String request_path = request.getServletPath();
				if(request_path.contains("/api/auth"))
					chain.doFilter(request, response);
				else if(request_path.contains("app") || request_path.contains("ws"))
					chain.doFilter(request, response);
				else
					constructorErrors("Não foi possível localizar o token", 403, response);
			}
		}catch(AccessDeniedException e) {
			constructorErrors("Acesso negado", 403, response);
		}catch(JWTVerificationException | JwtException e){
			constructorErrors("Token inválido", 403, response);
		}catch(BadCredentialsException e) {
			constructorErrors("Credenciais inválidas, tente novamente mais tarde!", 403, response);
		}catch(Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			constructorErrors("Não foi possível processar sua solicitação", 500, response);
		}
	}

	private void constructorErrors(String error, int status, HttpServletResponse response) throws JsonProcessingException, IOException {
		String errors = new ObjectMapper().writeValueAsString(new Errors(new ArrayList<String>() {{ add(error);}}, status));
		
		response.setStatus(status);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json; charset=UTF-8");
		response.getWriter().write(errors);
		response.getWriter().flush();
	}

	private UsernamePasswordAuthenticationToken getAuthenticationToken(final String token) {
		String usuario = JWT.require(Algorithm.HMAC512(secret.getBytes()))
				.build()
				.verify(token)
				.getSubject();

		if(usuario == null || usuario.isEmpty())
			return null;

		return new UsernamePasswordAuthenticationToken(usuario, null, new ArrayList<>());
	}

}
