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

import br.com.ocrfieldservice.core.entity.Activity;
import br.com.ocrfieldservice.core.entity.Address;
import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.ActivityRepository;
import br.com.ocrfieldservice.dataprovider.dao.ActivityDao;

@Repository
public class ActivityRepositoryImpl implements ActivityRepository {
	
	@Autowired ActivityDao activityDao;
	
	@Autowired EntityManager entityManager;
	
	@Override
	public void save(Activity entity) {
		// TODO Auto-generated method stub
		activityDao.saveAndFlush(entity);
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		activityDao.deleteById(id);
	}

	@Override
	public void update(Activity entity) {
		// TODO Auto-generated method stub
		activityDao.saveAndFlush(entity);
	}

	@Override
	public List<Activity> getAll(Organization organization) {
		// TODO Auto-generated method stub
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Activity> query = builder.createQuery(Activity.class);
		
		Root<Activity> root = query.from(Activity.class);
		Join<Activity, Organization> joinActivityOrganization = root.join("organization");
		query.orderBy(builder.desc(root.get("created")));
		query.select(root).distinct(true).where(
				builder.or(
						builder.equal(joinActivityOrganization.get("name"), organization.getName()),
						builder.equal(joinActivityOrganization.get("id"), organization.getId())
				));
		
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public Activity getById(Long id) {
		Optional<Activity> activity = activityDao.findById(id);
		if(activity.isPresent())
			return activity.get();

		return null;
	}

	@Override
	public Activity getLastRecord() {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Activity> query = builder.createQuery(Activity.class);
		
		Root<Activity> root = query.from(Activity.class);
		query.orderBy(builder.desc(root.get("id")));
		query.distinct(true).select(root);
		
		List<Activity> list = entityManager.createQuery(query).setMaxResults(1).getResultList();
		if(list != null && list.size() > 0) {
			return list.get(0);
		}
		
		return null;
	}

	@Override
	public List<Activity> getMyRecords(final Long userId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Activity> query = builder.createQuery(Activity.class);
		
		Root<Activity> root = query.from(Activity.class);
		Join<Activity, User > joinActivityUser = root.join("createdBy");
		query.orderBy(builder.desc(root.get("created")));
		
		query.select(root).distinct(true).where(builder.equal(joinActivityUser.get("id"), userId));
		
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Activity> searchActivity(String search) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Activity> query = builder.createQuery(Activity.class);
		
		Root<Activity> root = query.from(Activity.class);
		Join<Activity, Address> joinActivityAddress = root.join("address");
		query.orderBy(builder.desc(root.get("created")));
		
		query.select(root).distinct(true).where(
				builder.or(
						builder.like(root.get("number"), "%" + search + "%"),
						builder.like(root.get("description"), "%" + search + "%"),
						builder.like(joinActivityAddress.get("address"), "%" + search + "%"),
						builder.like(joinActivityAddress.get("state"), "%" + search + "%"),
						builder.like(joinActivityAddress.get("city"), "%" + search + "%"),
						builder.like(joinActivityAddress.get("CEP"), "%" + search + "%")
				)
		);
		
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Activity> queueAcitivity(Long orgId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Activity> query = builder.createQuery(Activity.class);
		
		Root<Activity> root = query.from(Activity.class);
		Join<Activity, Organization> joinActivityOrganization = root.join("organization");
		
		query.select(root).distinct(true).where(
				builder.and(
						builder.equal(joinActivityOrganization.get("id"), orgId),
						builder.isNull(root.get(("assigned")))
				));
		
		return entityManager.createQuery(query).getResultList();
	}
	

}
