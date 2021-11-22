package br.com.ocrfieldservice.dataprovider.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Capacity;
import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.Permission;
import br.com.ocrfieldservice.core.entity.Profile;
import br.com.ocrfieldservice.core.entity.Skill;
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

	@Override
	public List<User> selectAssignedUser(Set<Skill> skills, Set<Capacity> capacities, Organization organization) {
		// TODO Auto-generated method stub
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<User> query = builder.createQuery(User.class);
		Root<User> root = query.from(User.class);
		Join<User, Organization> joinUserOrganization = root.join("organization");
		Join<User, Profile> joinUserProfile = root.join("profile", JoinType.INNER);
		Join<Profile, Permission> joinProfilePermission = joinUserProfile.join("Permissions",JoinType.INNER);
		
		
		Predicate predicate = null;
		if(skills != null && skills.size() > 0 && capacities != null && capacities.size() <= 0) {
			Join<User, Skill> joinUserSkill = root.join("skills");
			List<Long> skillsIds = skills.stream().map(itens -> itens.getId()).collect(Collectors.toList());
			predicate = joinUserSkill.get("id").in(skillsIds);
		}else if(skills != null && skills.size() <= 0 && capacities != null && capacities.size() > 0) {
			Join<User, Capacity> joinUserCapacity = root.join("capacities");
			List<Long> capacitiesIds = capacities.stream().map(itens -> itens.getId()).collect(Collectors.toList());
			predicate = joinUserCapacity.get("id").in(capacitiesIds);
		}else if(skills != null && skills.size() > 0 && capacities != null && capacities.size() > 0){
			Join<User, Capacity> joinUserCapacity = root.join("capacities");
			Join<User, Skill> joinUserSkill = root.join("skills");
			
			List<Long> capacitiesIds = capacities.stream().map(itens -> itens.getId()).collect(Collectors.toList());
			predicate = joinUserSkill.get("id").in(capacitiesIds);
			
			List<Long> skillsIds = skills.stream().map(itens -> itens.getId()).collect(Collectors.toList());
			predicate = joinUserSkill.get("id").in(skillsIds);
			predicate = builder.and(
					joinUserSkill.get("id").in(skillsIds),
					joinUserCapacity.get("id").in(capacitiesIds)
			);		
		}

		query.select(root).distinct(true);
		
		if(predicate != null) {
			query.where(builder.and(
					predicate,
					builder.equal(joinProfilePermission.get("permission"), "receive:activity"),
					builder.or(
							builder.equal(joinUserOrganization.get("id"), organization.getId()),
							builder.equal(joinUserOrganization.get("name"), organization.getName())
					)
			));
		}else {
			query.where(builder.and(
					builder.equal(joinProfilePermission.get("permission"), "receive:activity"),
					builder.or(
							builder.equal(joinUserOrganization.get("id"), organization.getId()),
							builder.equal(joinUserOrganization.get("name"), organization.getName())
					)
			));
		}
		
		
		return entityManager.createQuery(query).getResultList();
	}
}
