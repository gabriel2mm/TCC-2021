package br.com.ocrfieldservice.core.usecase;

import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import br.com.ocrfieldservice.contracts.PasswordResetService;
import br.com.ocrfieldservice.core.entity.PasswordReset;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.PasswordResetRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${front.domain}")
	private String frontDomain;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordResetRepository repository;

	@Override
	public PasswordReset createToken(User user) {

		Calendar date = Calendar.getInstance();
		date.add(Calendar.MINUTE, 15);

		String token = JWT.create().withSubject(user.getUsername()).withExpiresAt(new Date(date.getTimeInMillis()))
				.sign(Algorithm.HMAC512(this.secret.getBytes()));

		PasswordReset passwordReset = new PasswordReset();
		passwordReset.setUser(user);
		passwordReset.setToken(token);
		passwordReset.setExpiration(new Date(date.getTimeInMillis()));
		passwordReset.setActive(true);

		repository.save(passwordReset);

		return passwordReset;
	}

	@Override
	public void ResetPassword(final String token, final String newPassword) {

		DecodedJWT decoded = JWT.require(Algorithm.HMAC512(this.secret)).build().verify(token);

		String email = decoded.getSubject();
		Date expireToken = decoded.getExpiresAt();
		Date currentDate = new Date();

		if (currentDate.before(expireToken)) {
			PasswordReset reset = repository.findByToken(token);
			if(reset.isActive()) {
				User user = userRepository.findByEmail(email);
				if(user != null) {
					user.setPassword(encoder.encode(newPassword));
					userRepository.save(user);
					reset.setActive(false);
					repository.save(reset);
				}
			}
		}
	}
}
