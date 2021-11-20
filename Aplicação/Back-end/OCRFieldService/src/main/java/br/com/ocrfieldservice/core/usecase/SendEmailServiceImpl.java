package br.com.ocrfieldservice.core.usecase;

import java.io.File;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import br.com.ocrfieldservice.contracts.SendEmailService;

@Service
public class SendEmailServiceImpl implements SendEmailService {

	@Value("${spring.mail.username}")
	private String emailFrom;

	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public void sendEmail(String subject, String body, String toEmail) throws MailException{
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setFrom(emailFrom);
		mailMessage.setSubject(subject);
		mailMessage.setTo(toEmail);
		mailMessage.setText(body);

		javaMailSender.send(mailMessage);
	}

	@Override
	public void sendEmail(String subject, String body, String toEmail, String fileAttchment, String filename, String extension) throws MailException {
		MimeMessagePreparator preparator = new MimeMessagePreparator()
	    {
	        @Override
			public void prepare(MimeMessage mimeMessage) throws Exception
	        {
	            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));
	            mimeMessage.setFrom(new InternetAddress(emailFrom));
	            mimeMessage.setSubject(subject);
	            mimeMessage.setText(body);

	            FileSystemResource file = new FileSystemResource(new File(fileAttchment));
	            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
	            helper.addAttachment(filename + "." + extension, file);
	        }
	    };

	    javaMailSender.send(preparator);

	}

}
