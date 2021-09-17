package br.com.ocrfieldservice.core.usecase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.ocrfieldservice.core.entity.User;

@Service("Sigin")
public class SignIn{
	
	@Autowired
	private PasswordEncoder encoder;
	
	public boolean sigin(final String password, final String passwordHash) {
		return encoder.matches(password, passwordHash);
	}

}
