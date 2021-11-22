package br.com.ocrfieldservice.dataprovider.repository;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Activity;
import br.com.ocrfieldservice.core.entity.Address;
import br.com.ocrfieldservice.core.entity.Capacity;
import br.com.ocrfieldservice.core.entity.Category;
import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.Skill;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.enumerators.ActivityStatus;
import br.com.ocrfieldservice.core.repository.ActivityRepository;
import br.com.ocrfieldservice.dataprovider.dao.ActivityDao;

@Repository
public class ActivityRepositoryImpl implements ActivityRepository {

	@Autowired
	ActivityDao activityDao;

	@Autowired
	EntityManager entityManager;

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
		query.select(root).distinct(true)
				.where(builder.or(builder.equal(joinActivityOrganization.get("name"), organization.getName()),
						builder.equal(joinActivityOrganization.get("id"), organization.getId())));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Activity> getAllBetweenDate(Organization organization, Date date) {
		// TODO Auto-generated method stub
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Activity> query = builder.createQuery(Activity.class);

		Calendar InitialDate = Calendar.getInstance();
		InitialDate.setTime(date);
		InitialDate.set(Calendar.HOUR_OF_DAY, 0);
		InitialDate.set(Calendar.MINUTE, 0);
		InitialDate.set(Calendar.SECOND, 0);

		Calendar finalDate = Calendar.getInstance();
		finalDate.setTime(date);
		finalDate.set(Calendar.HOUR_OF_DAY, 23);
		finalDate.set(Calendar.MINUTE, 59);
		finalDate.set(Calendar.SECOND, 59);

		Root<Activity> root = query.from(Activity.class);
		Join<Activity, Organization> joinActivityOrganization = root.join("organization");
		Join<Activity, User> joinActivityUser = root.join("assigned");
		query.orderBy(builder.asc(root.get("dateLimit")));
		query.select(root).distinct(true)
				.where(builder.and(builder.greaterThanOrEqualTo(root.get("created"), InitialDate.getTime()),
						builder.lessThanOrEqualTo(root.get("created"), finalDate.getTime()),
						builder.or(builder.equal(joinActivityOrganization.get("name"), organization.getName()),
								builder.equal(joinActivityOrganization.get("id"), organization.getId()))));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Activity> getAllBetweenDateAndUserList(Organization organization, Date date, List<User> users) {
		// TODO Auto-generated method stub
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Activity> query = builder.createQuery(Activity.class);

		Calendar InitialDate = Calendar.getInstance();
		InitialDate.setTime(date);
		InitialDate.set(Calendar.HOUR_OF_DAY, 0);
		InitialDate.set(Calendar.MINUTE, 0);
		InitialDate.set(Calendar.SECOND, 0);

		Calendar finalDate = Calendar.getInstance();
		finalDate.setTime(date);
		finalDate.set(Calendar.HOUR_OF_DAY, 23);
		finalDate.set(Calendar.MINUTE, 59);
		finalDate.set(Calendar.SECOND, 59);

		Root<Activity> root = query.from(Activity.class);
		Join<Activity, Organization> joinActivityOrganization = root.join("organization");
		Join<Activity, User> joinActivityUser = root.join("assigned", JoinType.INNER);

		query.orderBy(builder.asc(root.get("dateLimit")));
		query.select(root).distinct(true)
				.where(builder.and(builder.between(root.get("created"), InitialDate.getTime(), finalDate.getTime()),
						root.get("assigned").in(users),
						builder.or(builder.equal(joinActivityOrganization.get("name"), organization.getName()),
								builder.equal(joinActivityOrganization.get("id"), organization.getId()))));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public Activity getById(Long id) {
		Optional<Activity> activity = activityDao.findById(id);
		if (activity.isPresent())
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
		if (list != null && list.size() > 0) {
			return list.get(0);
		}

		return null;
	}

	@Override
	public List<Activity> getMyRecords(final Long userId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Activity> query = builder.createQuery(Activity.class);

		Root<Activity> root = query.from(Activity.class);
		Join<Activity, User> joinActivityUser = root.join("createdBy");
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

		query.select(root).distinct(true)
				.where(builder.or(builder.like(root.get("number"), "%" + search + "%"),
						builder.like(root.get("description"), "%" + search + "%"),
						builder.like(joinActivityAddress.get("address"), "%" + search + "%"),
						builder.like(joinActivityAddress.get("state"), "%" + search + "%"),
						builder.like(joinActivityAddress.get("city"), "%" + search + "%"),
						builder.like(joinActivityAddress.get("CEP"), "%" + search + "%")));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Activity> queueAcitivity(Long orgId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Activity> query = builder.createQuery(Activity.class);

		Root<Activity> root = query.from(Activity.class);
		Join<Activity, Organization> joinActivityOrganization = root.join("organization");

		query.select(root).distinct(true).where(builder.and(builder.equal(joinActivityOrganization.get("id"), orgId),
				builder.isNull(root.get(("assigned")))));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public User UserActivityAssigned(List<User> users, Date created, Date dateLimit) {
		// TODO Auto-generated method stub

		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> query = builder.createQuery(Long.class);
		
		Root<User> root = query.from(User.class);
		Join<User, Activity> joinUserActivity = root.join("activities");
		
		query.distinct(true).select(root.get("id")).where(
				builder.and(
					root.in(users),
					builder.greaterThanOrEqualTo(joinUserActivity.get("created"), created),
					builder.lessThanOrEqualTo(joinUserActivity.get("dateLimit"), dateLimit)
		));
		
		List<Long> userstmp = entityManager.createQuery(query).getResultList();
		
		List<User> output = users.stream().filter(user -> !userstmp.contains(user.getId())).collect(Collectors.toList());
		
		if(output != null && output.size() > 0) {
			return output.get(0);
		}
		
		return null;
	}

	@Override
	public Long countStatusOpen(Organization organization) {

		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> query = builder.createQuery(Long.class);

		Root<Activity> root = query.from(Activity.class);
		Join<Activity, Organization> joinActivityOrganization = root.join("organization");

		query.distinct(true).select(builder.count(root))
				.where(builder.and(builder.equal(root.get("status"), ActivityStatus.ABERTO),
						builder.or(builder.equal(joinActivityOrganization.get("name"), organization.getName()),
								builder.equal(joinActivityOrganization.get("id"), organization.getId()))));

		return entityManager.createQuery(query).getSingleResult();
	}

	@Override
	public Long countStatusCurrent(Organization organization) {

		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> query = builder.createQuery(Long.class);

		Root<Activity> root = query.from(Activity.class);
		Join<Activity, Organization> joinActivityOrganization = root.join("organization");

		query.select(builder.countDistinct(root))
				.where(builder.and(builder.equal(root.get("status"), ActivityStatus.EM_ANDAMENTO),
						builder.or(builder.equal(joinActivityOrganization.get("name"), organization.getName()),
								builder.equal(joinActivityOrganization.get("id"), organization.getId()))));

		return entityManager.createQuery(query).getSingleResult();
	}

	@Override
	public Long countStatusClosed(Organization organization) {

		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> query = builder.createQuery(Long.class);

		Calendar initDate = Calendar.getInstance();
		initDate.set(Calendar.HOUR_OF_DAY, 0);
		initDate.set(Calendar.MINUTE, 0);
		initDate.set(Calendar.SECOND, 0);

		Calendar finalDate = Calendar.getInstance();
		finalDate.set(Calendar.HOUR_OF_DAY, 23);
		finalDate.set(Calendar.MINUTE, 59);
		finalDate.set(Calendar.SECOND, 59);

		Root<Activity> root = query.from(Activity.class);
		Join<Activity, Organization> joinActivityOrganization = root.join("organization");

		query.select(builder.countDistinct(root))
			.where(builder.and(
					builder.greaterThanOrEqualTo(root.get("dateClosed"), initDate.getTime()),
					builder.lessThanOrEqualTo(root.get("dateClosed"), finalDate.getTime())
				)
			);

		return entityManager.createQuery(query).getSingleResult();
	}

	@Override
	public Long countStatusLate(Organization organization) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> query = builder.createQuery(Long.class);

		Calendar currDate = Calendar.getInstance();

		Root<Activity> root = query.from(Activity.class);
		Join<Activity, Organization> joinActivityOrganization = root.join("organization");

		query.select(builder.count(root))
				.where(builder.and(builder.lessThan(root.get("dateLimit"), currDate.getTime()),
						builder.or(
								builder.equal(root.get("status"), ActivityStatus.ABERTO),
								builder.equal(root.get("status"), ActivityStatus.EM_ANDAMENTO))
						),
						builder.or(
								builder.equal(joinActivityOrganization.get("name"), organization.getName()),
								builder.equal(joinActivityOrganization.get("id"), organization.getId())));

		return entityManager.createQuery(query).getSingleResult();
	}

	@Override
	public List<Object[]> countCategory(Organization organization) {

		 CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
	     CriteriaQuery<Object[]> query = criteriaBuilder.createQuery(Object[].class);
	     Root<Activity> root = query.from(Activity.class);
	     Join<Activity, Category> joinCategory = root.join("category");
	     Join<Activity, Organization> joinActivityOrganization = root.join("organization");
	     
	     
	     query.multiselect(joinCategory.get("name"), criteriaBuilder.count(root))
	     .where(criteriaBuilder.or(
	    		 criteriaBuilder.equal(joinActivityOrganization.get("name"), organization.getName()),
	    		 criteriaBuilder.equal(joinActivityOrganization.get("id"), organization.getId())));
	     
	     query.groupBy(joinCategory.get("name"));
	     
	     TypedQuery<Object[]> typedQuery = entityManager.createQuery(query);
	     List<Object[]> resultList = typedQuery.getResultList();
	     
		return resultList;
	}
	
	@Override
	public List<Object[]> countSkills(Organization organization) {

		 CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
	     CriteriaQuery<Object[]> query = criteriaBuilder.createQuery(Object[].class);
	     Root<Activity> root = query.from(Activity.class);
	     Join<Activity, Category> joinCategory = root.join("category");
	     Join<Category, Skill> joinCategorySkill = joinCategory.join("skills");
	     Join<Activity, Organization> joinActivityOrganization = root.join("organization");
	     
	     
	     query.multiselect(joinCategorySkill.get("name"), criteriaBuilder.count(root))
	     .where(criteriaBuilder.or(
	    		 criteriaBuilder.equal(joinActivityOrganization.get("name"), organization.getName()),
	    		 criteriaBuilder.equal(joinActivityOrganization.get("id"), organization.getId())));
	     
	     query.groupBy(joinCategorySkill.get("name"));
	     
	     TypedQuery<Object[]> typedQuery = entityManager.createQuery(query);
	     List<Object[]> resultList = typedQuery.getResultList();
		
		return resultList;
	}
	
	@Override
	public List<Object[]> countCapacity(Organization organization) {

		 CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
	     CriteriaQuery<Object[]> query = criteriaBuilder.createQuery(Object[].class);
	     Root<Activity> root = query.from(Activity.class);
	     Join<Activity, Category> joinCategory = root.join("category");
	     Join<Category, Capacity> joinCategoryCapacity = joinCategory.join("capacities");
	     Join<Activity, Organization> joinActivityOrganization = root.join("organization");
	     
	     
	     query.multiselect(joinCategoryCapacity.get("name"), criteriaBuilder.count(root))
	     .where(criteriaBuilder.or(
	    		 criteriaBuilder.equal(joinActivityOrganization.get("name"), organization.getName()),
	    		 criteriaBuilder.equal(joinActivityOrganization.get("id"), organization.getId())));
	     query.groupBy(joinCategoryCapacity.get("name"));
	     
	     TypedQuery<Object[]> typedQuery = entityManager.createQuery(query);
	     List<Object[]> resultList = typedQuery.getResultList();
		
		return resultList;
	}
	
	
	@Override
	public List<Object[]> historyActivitiesClosed(Organization organization) {

		 CriteriaBuilder builder = entityManager.getCriteriaBuilder();
	     CriteriaQuery<Object[]> query = builder.createQuery(Object[].class);
	     Root<Activity> root = query.from(Activity.class);
	     Join<Activity, Organization> joinActivityOrganization = root.join("organization");
	     
	     query.multiselect(builder.count(root.get("id")), builder.function("month", Integer.class, root.get("dateClosed")), builder.function("year", Integer.class, root.get("dateClosed")))
	     .where(
	    		 builder.and(
	    				 	builder.or(
	    				 			builder.equal(root.get("status"), ActivityStatus.CONCLUIDO),
	    				 			builder.equal(root.get("status"), ActivityStatus.FECHADO)
	    				 	),
	    				 	builder.or(
	    				 			builder.equal(joinActivityOrganization.get("name"), organization.getName()),
	    				 			builder.equal(joinActivityOrganization.get("id"), organization.getId())
	    				 	)
	    				 )
	    		 );
	     query.groupBy(builder.function("month", Integer.class, root.get("dateClosed")));
	     query.orderBy(builder.asc(root.get("dateClosed")));
	     
	     TypedQuery<Object[]> typedQuery = entityManager.createQuery(query);
	     List<Object[]> resultList = typedQuery.getResultList();
		
		return resultList;
	}
	
	
	@Override
	public List<Object[]> historyActivitiesLated(Organization organization) {

		 CriteriaBuilder builder = entityManager.getCriteriaBuilder();
	     CriteriaQuery<Object[]> query = builder.createQuery(Object[].class);
	     Root<Activity> root = query.from(Activity.class);
	     Join<Activity, Organization> joinActivityOrganization = root.join("organization");
	     
	     query.multiselect(builder.count(root.get("id")), builder.function("month", Integer.class, root.get("dateClosed")), builder.function("year", Integer.class, root.get("dateClosed")))
	     .where(
	    		 builder.and(
	    				 	builder.greaterThan(root.get("dateClosed"), root.get("dateLimit")),
	    				 	builder.or(
	    				 			builder.equal(root.get("status"), ActivityStatus.CONCLUIDO),
	    				 			builder.equal(root.get("status"), ActivityStatus.FECHADO)
	    				 	),
	    				 	builder.or(
	    				 			builder.equal(joinActivityOrganization.get("name"), organization.getName()),
	    				 			builder.equal(joinActivityOrganization.get("id"), organization.getId())
	    				 	)
	    				 )
	    		 );
	     
	     query.groupBy(builder.function("month", Integer.class, root.get("dateClosed")));
	     query.orderBy(builder.asc(root.get("dateClosed")));
	     
	     TypedQuery<Object[]> typedQuery = entityManager.createQuery(query);
	     List<Object[]> resultList = typedQuery.getResultList();
		
		return resultList;
	}

}
