package br.com.ocrfieldservice.contracts;

import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

@Service
public interface SendEmailService {

	public void sendEmail(final String subject, final String body, final String toEmail) throws MailException;
	
	public void sendEmail(final String subject, final String body, final String toEmail, final String fileAttchment, String filename, String extension) throws MailException;
}
