package br.com.ocrfieldservice.core.repository;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Activity;
import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.User;

@Repository
public interface ActivityRepository extends GenericCRUD<Activity, Long>{
	
	public Activity getLastRecord();
	
	public List<Activity> getMyRecords(final Long userId);
	
	public List<Activity> searchActivity(final String search);
	
	public List<Activity> queueAcitivity(final Long orgId);
	
	public List<Activity> getAllBetweenDate(Organization organization, Date date);
	
	public List<Activity> getAllBetweenDateAndUserList(Organization organization, Date date, List<User> users);
	
	public User UserActivityAssigned(List<User> users, Date created, Date dateLimit);
	
	public Long countStatusOpen(Organization organization);
	
	public Long countStatusCurrent(Organization organization);
	
	public Long countStatusClosed(Organization organization);
	
	public Long countStatusLate(Organization organization);
	
	public List<Object[]> countCategory(Organization organization);
	
	public List<Object[]> countSkills(Organization organization);
	
	public List<Object[]> countCapacity(Organization organization);
	
	public List<Object[]> historyActivitiesClosed(Organization organization);
	
	public List<Object[]> historyActivitiesLated(Organization organization);
}
