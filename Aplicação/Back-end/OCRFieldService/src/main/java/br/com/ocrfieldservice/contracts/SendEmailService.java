package br.com.ocrfieldservice.contracts;

import org.springframework.stereotype.Service;

@Service
public interface SendEmailService {

	public void sendEmail(final String body);
}
