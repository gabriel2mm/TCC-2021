package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.dataprovider.entity.User;

@Repository
public interface UserRepository {
	
	public User save(User user);
	
	public List<User> findAll();
		
	public List<User> findUser(User user);
	
	public User findUser(final String email, final String password);
}
