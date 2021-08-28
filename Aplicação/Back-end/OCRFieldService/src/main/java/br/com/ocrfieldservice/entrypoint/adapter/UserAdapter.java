package br.com.ocrfieldservice.entrypoint.adapter;

import org.springframework.stereotype.Component;

import br.com.ocrfieldservice.dataprovider.entity.User;
import br.com.ocrfieldservice.entrypoint.request.SignRequest;

@Component
public class UserAdapter {
//alterar para usuario do core
	public User toUser(SignRequest request) {
		return new User(request.getEmail(), request.getPassword());
	}
}
