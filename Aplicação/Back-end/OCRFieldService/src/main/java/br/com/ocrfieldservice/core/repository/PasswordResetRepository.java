package br.com.ocrfieldservice.core.repository;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.PasswordReset;

@Repository
public interface PasswordResetRepository {

	public void save(final PasswordReset passwordReset);
	
	public PasswordReset findByToken(final String token);
}
