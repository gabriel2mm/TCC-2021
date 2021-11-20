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

import br.com.ocrfieldservice.core.entity.Category;
import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.repository.CategoryRepository;
import br.com.ocrfieldservice.dataprovider.dao.CategoryDao;

@Repository
public class CategoryRepositoryImpl implements CategoryRepository, Serializable {


	private static final long serialVersionUID = -892245858766732057L;

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Category> findAll() {
		return categoryDao.findAll();
	}

	@Override
	public Category findOne(Long id) {
		Optional<Category> category = categoryDao.findById(id);
		if(category.isPresent())
			return category.get();

		return null;
	}

	@Override
	public void save(Category category) {
		categoryDao.saveAndFlush(category);
	}

	@Override
	public void update(Category category) {
		categoryDao.saveAndFlush(category);
	}

	@Override
	public void deleteId(Long id) {
		if(id != null)
			categoryDao.deleteById(id);

	}

	@Override
	public List<Category> findByOrg(Organization organization) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Category> query = builder.createQuery(Category.class);
		Root<Category> root = query.from(Category.class);
		Join<Category, Organization> joinCategoryrOganization = root.join("organization");

		query.select(root).distinct(true).where(
				builder.or(
						builder.equal(joinCategoryrOganization.get("name"), organization.getName()),
						builder.equal(joinCategoryrOganization.get("id"), organization.getId())
				)
		);

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Category> findByOrgId(Long orgId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Category> query = builder.createQuery(Category.class);
		Root<Category> root = query.from(Category.class);
		Join<Category, Organization> joinCategoryrOganization = root.join("organization");

		query.select(root).distinct(true).where(
				builder.equal(joinCategoryrOganization.get("id"), orgId)
		);

		return entityManager.createQuery(query).getResultList();
	}

}
