package br.com.ocrfieldservice.dataprovider.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.UserRepository;
import br.com.ocrfieldservice.dataprovider.dao.UserDao;

@Repository("userRepository")
public class UserRepositoryImpl implements UserRepository {

	@Autowired
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

	@Override
	public List<User> findByOrg(Organization organization) {

		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<User> query = builder.createQuery(User.class);
		Root<User> root = query.from(User.class);
		Join<User, Organization> joinUserOganization = root.join("organization");

		query.select(root).distinct(true).where(
				builder.or(
						builder.equal(joinUserOganization.get("name"), organization.getName()),
						builder.equal(joinUserOganization.get("id"), organization.getId())
				)
		);

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<User> findByOrgId(Long orgId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<User> query = builder.createQuery(User.class);
		Root<User> root = query.from(User.class);
		Join<User, Organization> joinUserOganization = root.join("organization");

		query.select(root).distinct(true).where(
				builder.equal(joinUserOganization.get("id"), orgId)
		);

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public User findById(Long id) {
		Optional<User> user = userDao.findById(id);
		if(user.isPresent())
			return user.get();

		return null;
	}

	@Override
	public Long countUsersByOrganizationId(final Long orgId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> query = builder.createQuery(Long.class);
		Root<User> root = query.from(User.class);
		Join<User, Organization> joinUserOganization = root.join("organization");

		query.select(builder.count(root)).distinct(true).where(builder.equal(joinUserOganization.get("id"), orgId));

		return entityManager.createQuery(query).getSingleResult();
	}

	@Override
	public void deleteById(Long id) {
		if(id != null) {
			userDao.deleteById(id);
		}
	}
}
