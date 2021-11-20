package br.com.ocrfieldservice.contracts;

import org.springframework.stereotype.Service;

import br.com.ocrfieldservice.core.entity.PasswordReset;
import br.com.ocrfieldservice.core.entity.User;

@Service
public interface PasswordResetService {

	public PasswordReset createToken(User user);

	public void ResetPassword(final String token, final String newPassword);
}
