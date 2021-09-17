package br.com.ocrfieldservice.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

@Component
public class JWTValidateTokenFilter extends BasicAuthenticationFilter {

	private final String secret = "APLICACAOBACKENDTCC2";
	private static final String HEADER = "Authorization";
	private static final String PREFIX = "Bearer ";
	
	public JWTValidateTokenFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);		
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		
		String authorizationHeader = request.getHeader(HEADER);
		
		if(authorizationHeader == null || !authorizationHeader.startsWith(PREFIX)) {
			chain.doFilter(request, response);
			return;
		}
		
		String token = authorizationHeader.replace(PREFIX, "");
		UsernamePasswordAuthenticationToken authenticationToken = getAuthenticationToken(token);
		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
		
		chain.doFilter(request, response);
		
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
