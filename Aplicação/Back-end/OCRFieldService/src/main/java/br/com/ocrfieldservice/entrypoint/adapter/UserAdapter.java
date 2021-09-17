package br.com.ocrfieldservice.entrypoint.adapter;

import org.springframework.stereotype.Component;

import br.com.ocrfieldservice.core.entity.User;

@Component
public class UserAdapter {

	public User toUser(br.com.ocrfieldservice.dataprovider.entity.User user) {
		User _user = new User();
		_user.setActive(user.isActive());
		_user.setCreated(user.getCreated());
		_user.setUpdated(user.getUpdated());
		_user.setEmail(user.getEmail());
		_user.setFirstName(user.getFirstName());
		_user.setLastName(user.getLastName());		
		return _user;
	}
}
