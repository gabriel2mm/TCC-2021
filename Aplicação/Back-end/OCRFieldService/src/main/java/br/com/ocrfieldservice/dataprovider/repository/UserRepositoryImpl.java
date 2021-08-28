package br.com.ocrfieldservice.dataprovider.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.repository.UserRepository;
import br.com.ocrfieldservice.dataprovider.dao.UserDao;
import br.com.ocrfieldservice.dataprovider.entity.User;

@Repository
public class UserRepositoryImpl implements UserRepository{

	@Autowired
	private UserDao userDao;
	
	@Override
	public User save(User user) {
		return userDao.save(user);
	}

	@Override
	public List<User> findAll() {
		return userDao.findAll();
	}

	@Override
	public List<User> findUser(User user) {
		Example<User> userExemple = Example.of(user);
		return userDao.findAll(userExemple);
	}

	@Override
	public User findUser(String email, String password) {

		User user = new User();
		user.setEmail(email);
		user.setPassword(password);
		Optional<User> optionalUser = userDao.findOne(Example.of(user));
		
		return optionalUser.get();
	}

}
