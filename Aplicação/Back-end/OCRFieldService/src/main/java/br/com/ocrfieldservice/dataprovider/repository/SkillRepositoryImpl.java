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

import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.Skill;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.SkillRepository;
import br.com.ocrfieldservice.dataprovider.dao.SkillDao;

@Repository
public class SkillRepositoryImpl implements SkillRepository, Serializable{

	private static final long serialVersionUID = 6641486967057262057L;
	
	@Autowired
	private SkillDao skillDao;
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Skill> findAll() {
		return skillDao.findAll();
	}

	@Override
	public Skill findOne(Long id) {
		Optional<Skill> skill = skillDao.findById(id);
		if(skill.isPresent())
			return skill.get();
		
		return null;
	}

	@Override
	public void save(Skill skill) {
		skillDao.saveAndFlush(skill);
	}

	@Override
	public void update(Skill skill) {
		skillDao.saveAndFlush(skill);
	}

	@Override
	public void deleteId(Long id) {
		if(id != null)
			skillDao.deleteById(id);
	}

	@Override
	public List<Skill> findByOrg(Organization organization) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Skill> query = builder.createQuery(Skill.class);
		Root<Skill> root = query.from(Skill.class);
		Join<Skill, Organization> joinSkillOganization = root.join("organization");

		query.select(root).distinct(true)
				.where(builder.or(builder.equal(joinSkillOganization.get("name"), organization.getName()),
						builder.equal(joinSkillOganization.get("id"), organization.getId())));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Skill> findByOrgId(Long orgId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Skill> query = builder.createQuery(Skill.class);
		Root<Skill> root = query.from(Skill.class);
		Join<Skill, Organization> joinSkillOganization = root.join("organization");

		query.select(root).distinct(true)
				.where(builder.equal(joinSkillOganization.get("id"), orgId ));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Skill> findByUser(User user) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Skill> query = builder.createQuery(Skill.class);
		Root<Skill> root = query.from(Skill.class);
		Join<Skill, User> joinSkillUser = root.join("users");

		query.select(root).distinct(true)
			.where(
					builder.or(
							builder.equal(joinSkillUser.get("firstName"), user.getFirstName()),
							builder.equal(joinSkillUser.get("lastName"), user.getLastName()),
							builder.equal(joinSkillUser.get("email"), user.getEmail()),
							builder.equal(joinSkillUser.get("CPF"), user.getCPF())
					)
			);

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Skill> findByUserById(Long userId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Skill> query = builder.createQuery(Skill.class);
		Root<Skill> root = query.from(Skill.class);
		Join<Skill, User> joinSkillUser = root.join("users");

		query.select(root).distinct(true)
				.where(builder.equal(joinSkillUser.get("id"), userId ));

		return entityManager.createQuery(query).getResultList();
	}

}
