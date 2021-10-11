package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Activity;

@Repository
public interface ActivityRepository {
	

	public Activity save(Activity activity);

	public void update(final Activity activity);

	public void delete(final Long id);

	public List<Activity> findAll();

	public List<Activity> findActivity(Activity activity);

	//public Address findUser(final String email, final String password);

	public List<Activity> findAllByOrg(final String orgName);

	public Activity findOneById(final Long id);

	public Activity findById(Long id);
}
