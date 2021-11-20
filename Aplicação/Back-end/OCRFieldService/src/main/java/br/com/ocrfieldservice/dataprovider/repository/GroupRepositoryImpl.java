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

import br.com.ocrfieldservice.core.entity.GroupUsers;
import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.repository.GroupRepository;
import br.com.ocrfieldservice.dataprovider.dao.GroupDao;

@Repository
public class GroupRepositoryImpl implements GroupRepository, Serializable {

	private static final long serialVersionUID = -1461527904810582024L;

	@Autowired
	private GroupDao groupDao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<GroupUsers> findAll() {
		return groupDao.findAll();
	}

	@Override
	public GroupUsers findOne(Long id) {
		Optional<GroupUsers> group = groupDao.findById(id);
		if(group.isPresent())
				return group.get();

		return null;
	}

	@Override
	public void save(GroupUsers group) {
		groupDao.saveAndFlush(group);
	}

	@Override
	public void update(GroupUsers group) {
		groupDao.saveAndFlush(group);

	}

	@Override
	public void deleteId(Long id) {
		if(id != null) {
			groupDao.deleteById(id);
		}
	}

	@Override
	public List<GroupUsers> findByOrg(Organization organization) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<GroupUsers> query = builder.createQuery(GroupUsers.class);
		Root<GroupUsers> root = query.from(GroupUsers.class);
		Join<GroupUsers, Organization> joinGroupOganization = root.join("organization");

		query.select(root).distinct(true).where(
				builder.or(
						builder.equal(joinGroupOganization.get("name"), organization.getName()),
						builder.equal(joinGroupOganization.get("id"), organization.getId())
				)
		);

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<GroupUsers> findByOrgId(Long orgId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<GroupUsers> query = builder.createQuery(GroupUsers.class);
		Root<GroupUsers> root = query.from(GroupUsers.class);
		Join<GroupUsers, Organization> joinGroupOganization = root.join("organization");

		query.select(root).distinct(true).where(
				builder.equal(joinGroupOganization.get("id"), orgId)
		);

		return entityManager.createQuery(query).getResultList();
	}

}
