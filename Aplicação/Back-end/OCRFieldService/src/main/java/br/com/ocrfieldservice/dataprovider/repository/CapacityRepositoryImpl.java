package br.com.ocrfieldservice.dataprovider.repository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Capacity;
import br.com.ocrfieldservice.core.entity.Category;
import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.CapacityRepository;
import br.com.ocrfieldservice.dataprovider.dao.CapacityDao;

@Repository
public class CapacityRepositoryImpl implements CapacityRepository, Serializable {

	private static final long serialVersionUID = 4298538164064096995L;

	@Autowired
	private CapacityDao capacityDao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Capacity> findAll() {
		return capacityDao.findAll();
	}

	@Override
	public Capacity findOne(Long id) {
		Optional<Capacity> capacity = capacityDao.findById(id);
		if (capacity.isPresent())
			return capacity.get();

		return null;
	}

	@Override
	public void save(Capacity capacity) {
		capacityDao.saveAndFlush(capacity);
	}

	@Override
	public void update(Capacity capacity) {
		capacityDao.saveAndFlush(capacity);
	}

	@Override
	public void deleteId(Long id) {
		if (id != null)
			capacityDao.deleteById(id);
	}

	@Override
	public List<Capacity> findByOrg(Organization organization) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Capacity> query = builder.createQuery(Capacity.class);
		Root<Capacity> root = query.from(Capacity.class);
		Join<Capacity, Organization> joinCapacityOganization = root.join("organization");

		query.select(root).distinct(true)
				.where(builder.or(builder.equal(joinCapacityOganization.get("name"), organization.getName()),
						builder.equal(joinCapacityOganization.get("id"), organization.getId())));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Capacity> findByOrgId(Long orgId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Capacity> query = builder.createQuery(Capacity.class);
		Root<Capacity> root = query.from(Capacity.class);
		Join<Capacity, Organization> joinCapacityOganization = root.join("organization");

		query.select(root).distinct(true).where(builder.equal(joinCapacityOganization.get("id"), orgId));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Capacity> findByCategory(Category category) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Capacity> query = builder.createQuery(Capacity.class);
		Root<Capacity> root = query.from(Capacity.class);
		Join<Capacity, Category> joinCapacityCategory = root.join("capacities");

		query.select(root).distinct(true)
				.where(builder.or(builder.equal(joinCapacityCategory.get("name"), category.getName()),
						builder.equal(joinCapacityCategory.get("id"), category.getId())));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Capacity> findByCategoryId(Long categoryId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Capacity> query = builder.createQuery(Capacity.class);
		Root<Capacity> root = query.from(Capacity.class);
		Join<Capacity, Category> joinCapacityCategory = root.join("capacities");

		query.select(root).distinct(true).where(builder.equal(joinCapacityCategory.get("id"), categoryId));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Capacity> findByUser(User user) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Capacity> query = builder.createQuery(Capacity.class);
		Root<Capacity> root = query.from(Capacity.class);
		Join<Capacity, User> joinCapacityUser = root.join("users");

		query.select(root).distinct(true)
				.where(builder.or(builder.equal(joinCapacityUser.get("firstName"), user.getFirstName()),
						builder.equal(joinCapacityUser.get("lastName"), user.getLastName()),
						builder.equal(joinCapacityUser.get("email"), user.getEmail()),
						builder.equal(joinCapacityUser.get("CPF"), user.getCPF()),
						builder.equal(joinCapacityUser.get("id"), user.getId())));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Capacity> findByUserId(Long userId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Capacity> query = builder.createQuery(Capacity.class);
		Root<Capacity> root = query.from(Capacity.class);
		Join<Capacity, User> joinCapacityUser = root.join("users");

		query.select(root).distinct(true).where(builder.equal(joinCapacityUser.get("id"), userId));

		return entityManager.createQuery(query).getResultList();
	}

}
