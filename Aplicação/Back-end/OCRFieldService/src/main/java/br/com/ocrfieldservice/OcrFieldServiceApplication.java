package br.com.ocrfieldservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@ComponentScan({"br.com.ocrfieldservice"})
@EntityScan({"br.com.ocrfieldservice"})
@EnableJpaRepositories(basePackages = "br.com.ocrfieldservice")
@SpringBootApplication
@EnableTransactionManagement
public class OcrFieldServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OcrFieldServiceApplication.class, args);
	}
}
