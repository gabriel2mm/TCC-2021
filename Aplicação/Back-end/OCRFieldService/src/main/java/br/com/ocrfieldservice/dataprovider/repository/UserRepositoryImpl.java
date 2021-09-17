package br.com.ocrfieldservice.dataprovider.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.repository.UserRepository;
import br.com.ocrfieldservice.dataprovider.dao.UserDao;
import br.com.ocrfieldservice.dataprovider.entity.User;

@Repository
public class UserRepositoryImpl implements UserRepository {

	@PersistenceContext
    private EntityManager entityManager;
	
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
		return userDao.findAll().get(0);
	}

	@Override
	public User findByEmail(String email) {
		
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<User> query = builder.createQuery(User.class);
		Root<User> root = query.from(User.class);
		query.select(root).where(builder.equal(root.get("email"), email));
		
		return entityManager.createQuery(query).getSingleResult();
	}

}
