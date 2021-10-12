package br.com.ocrfieldservice.dataprovider.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.UserRepository;
import br.com.ocrfieldservice.dataprovider.dao.UserDao;

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
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<User> criteria = builder.createQuery(User.class);
		Root<User> root = criteria.from(User.class);
		criteria.distinct(true)
			.select(root)
			.where(builder.or(
					builder.like(root.get("firstName"), user.getFirstName()),
					builder.like(root.get("lastName"), user.getLastName()),
					builder.like(root.get("email"), user.getEmail())
			));
		return entityManager.createQuery(criteria).getResultList();
	}

	@Override
	public User findUser(String email, String password) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<User> criteria = builder.createQuery(User.class);
		Root<User> root = criteria.from(User.class);
		criteria.distinct(true).select(root)
			.where(builder.and(
					builder.equal(root.get("email"), email),
					builder.equal(root.get("password"), password)
		));
		
		List<User> users = entityManager.createQuery(criteria).getResultList();
		if(users != null && users.size() > 0) {
			return users.get(0);
		}
		
		return null;
	}

	@Override
	public User findByEmail(String email) {
		
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<User> query = builder.createQuery(User.class);
		Root<User> root = query.from(User.class);
		query.select(root).where(builder.equal(root.get("email"), email));
		
		
		List<User> users = entityManager.createQuery(query).getResultList();
		if(users != null && users.size() > 0) {
			return users.get(0);
		}
		
		return null;
	}

}
