package br.com.ocrfieldservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.AutoConfigurationPackage;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan({"br.com.ocrfieldservice"})
@EntityScan({"br.com.ocrfieldservice"})
@EnableJpaRepositories(basePackages = "br.com.ocrfieldservice.dataprovider")
@EnableAutoConfiguration
@AutoConfigurationPackage
@SpringBootApplication
public class OcrFieldServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OcrFieldServiceApplication.class, args);
	}
}
