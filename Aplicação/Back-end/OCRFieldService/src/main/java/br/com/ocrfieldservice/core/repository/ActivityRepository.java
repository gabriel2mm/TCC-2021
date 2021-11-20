package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Activity;

@Repository
public interface ActivityRepository extends GenericCRUD<Activity, Long>{
	
	public Activity getLastRecord();
	
	public List<Activity> getMyRecords(final Long userId);
	
	public List<Activity> searchActivity(final String search);
	
	public List<Activity> queueAcitivity(final Long orgId);
}
