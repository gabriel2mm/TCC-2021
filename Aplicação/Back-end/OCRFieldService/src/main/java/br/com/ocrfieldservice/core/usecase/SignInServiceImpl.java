package br.com.ocrfieldservice.core.usecase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.ocrfieldservice.contracts.SignInService;

@Service
public class SignInServiceImpl implements SignInService{

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public boolean sigin(final String password, final String passwordHash) {
		return encoder.matches(password, passwordHash);
	}

}
