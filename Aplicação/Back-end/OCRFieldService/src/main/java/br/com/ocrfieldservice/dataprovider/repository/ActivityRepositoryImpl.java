package br.com.ocrfieldservice.dataprovider.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Activity;
import br.com.ocrfieldservice.core.repository.ActivityRepository;
import br.com.ocrfieldservice.dataprovider.dao.ActivityDao;

@Repository
public class ActivityRepositoryImpl implements ActivityRepository {

	@PersistenceContext
    private EntityManager entityManager;
	
	@Autowired
	private ActivityDao activityDao;

	@Override
	public Activity save(Activity activity) {
		return activityDao.save(activity);
	}

	@Override
	public List<Activity> findAll() {
		return activityDao.findAll();
	}

	@Override
	public List<Activity> findActivity(Activity activity) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Activity> criteria = builder.createQuery(Activity.class);
		Root<Activity> root = criteria.from(Activity.class);
		criteria.distinct(true)
			.select(root)
			.where(builder.or(
					/*builder.like(root.get("firstName"), address.getFirstName()),
					builder.like(root.get("lastName"), address.getLastName()),
					builder.like(root.get("email"), address.getEmail())*/
			));
		return entityManager.createQuery(criteria).getResultList();
	}

	@Override
	public Activity findById(Long id) {
		return activityDao.getById(id);
	}

    @Override
    public void update(Activity activity) {
        Optional<Activity> profileTmp = activityDao.findById(activity.getId());
        if(profileTmp.isPresent()) {
        	activityDao.saveAndFlush(activity);
        }
    }

	@Override
	public void delete(Long id) {
		activityDao.deleteById(id);
		
	}

	@Override
	public List<Activity> findAllByOrg(String orgName) {
		// TODO Auto-generated method stub
		return null;
	}

    @Override
    public Activity findOneById(Long id) {
        Optional<Activity> activityTmp = activityDao.findById(id);
        if(activityTmp.isPresent()) {
            return activityTmp.get();
        }
        return null;
    }

}
