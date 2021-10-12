package br.com.ocrfieldservice.contracts;

import org.springframework.stereotype.Service;

@Service
public interface SignInService {

	public boolean sigin(final String password, final String passwordHash);
}
