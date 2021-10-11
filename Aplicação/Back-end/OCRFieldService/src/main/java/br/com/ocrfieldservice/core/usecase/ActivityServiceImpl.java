package br.com.ocrfieldservice.core.usecase;

import org.springframework.stereotype.Service;

import br.com.ocrfieldservice.contracts.ActivityService;
import br.com.ocrfieldservice.core.entity.Activity;
import br.com.ocrfieldservice.core.repository.ActivityRepository;

@Service
public class ActivityServiceImpl implements ActivityService{
	
	
	@Override
	public Activity updateActivity(Long id, ActivityRepository activityRepository) {
		return ActivityService.super.updateActivity(id, activityRepository);
	}

}
