package br.com.ocrfieldservice.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import br.com.ocrfieldservice.core.repository.UserRepository;
import br.com.ocrfieldservice.security.JWTAuthenticationFilter;
import br.com.ocrfieldservice.security.JWTValidateTokenFilter;
import br.com.ocrfieldservice.security.UserDetailService;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurity extends WebSecurityConfigurerAdapter {

	@Value("${jwt.secret}")
	private String secret;
	
	@Autowired
	private UserDetailService userDetailService;
	
	private static final String[] MATCHERS_PUBLIC = { "/api/auth/**", "/ws", "/ws/**", "/app", "/app/**" };
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailService).passwordEncoder(passwordEncoder());
	}
	
	@Bean
	public JWTAuthenticationFilter authenticationFilter() {
		try {
			return new JWTAuthenticationFilter(authenticationManager());
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return null;
	}
	
	@Bean
	public JWTValidateTokenFilter jwtValidateTokenFilter() {
		try {
			return new JWTValidateTokenFilter(authenticationManager());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable();
		http.authorizeRequests().antMatchers(MATCHERS_PUBLIC).permitAll().anyRequest()
				.authenticated()
				.and()
				.addFilter(authenticationFilter())
				.addFilter(jwtValidateTokenFilter())
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}

	@Bean
	CorsConfigurationSource corsConfiguratationSouce() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
		source.registerCorsConfiguration("/**", corsConfiguration);

		return source;
	}
	
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
	    return super.authenticationManagerBean();
	}
}

