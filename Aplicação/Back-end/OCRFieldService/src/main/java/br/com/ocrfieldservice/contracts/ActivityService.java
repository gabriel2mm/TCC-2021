package br.com.ocrfieldservice.contracts;

import org.springframework.stereotype.Service;

import br.com.ocrfieldservice.core.entity.Activity;
import br.com.ocrfieldservice.core.repository.ActivityRepository;

@Service
public interface ActivityService {

	public default Activity updateActivity(Long id, ActivityRepository activityRepository) {
		Activity activity = activityRepository.findById(id);

        if(activity != null) {
        	System.out.println(activity);
            return activity;
        }
        
        return null;
    }
}
