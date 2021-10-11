package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ocrfieldservice.core.entity.Activity;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.ActivityRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@RestController
@RequestMapping(value = "/api/activity")
@CrossOrigin(allowCredentials = "", allowedHeaders = "")
public class ActivityController {

	@Autowired
	private ActivityRepository activityRepository;

	@Autowired
	private UserRepository userRepository;

	@GetMapping
	public ResponseEntity<List<Activity>> getAllProfilesByOrganization() {
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			return new ResponseEntity<List<Activity>>(activityRepository.findAllByOrg(user.getOrganization().getName()), HttpStatus.OK);
		}

		return new ResponseEntity<List<Activity>>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}

	@GetMapping(value = "/{id}")
	//@PreAuthorize("hasAuthority('Admin') or hasAuthority('READ_PROFILE') or hasAuthority('WRITEPROFILE')")
	public ResponseEntity<Activity> getProfileById(@PathVariable("id") final Long id) {
		System.out.println(id);
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Activity activity = activityRepository.findOneById(id);

		if(user != null && activity != null) {			
			return new ResponseEntity<Activity>(activity, HttpStatus.OK);
		}

		return new ResponseEntity<Activity>(new Activity(),  HttpStatus.BAD_REQUEST);
	}

	@PostMapping
	//@PreAuthorize("hasAuthority('Admin') or hasAuthority('WRITEPROFILE')")
	public ResponseEntity<HttpStatus> createProfile(@RequestBody Activity activity){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			activityRepository.save(activity);

			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
	}

	@PutMapping("/{id}")
	//@PreAuthorize("hasAuthority('Admin') or hasAuthority('WRITEPROFILE')")
	public ResponseEntity<HttpStatus> updateProfile(@PathVariable("id") Long id, @RequestBody Activity activity){
		System.out.println(id);
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Activity activityTmp = activityRepository.findOneById(id);
		if(user != null && activityTmp != null ) {
			//address.setCreatedBy(user);
			//address.setOrg(user.getOrganization());
			
			
			activityTmp.setNumber(activity.getNumber());
			//activityTmp.setCreatedBy(user);
			//activityTmp.setRequester(user);
			//activityTmp.setAssignedUser(user);
			activityTmp.setDescription(activity.getDescription());
			activityTmp.setCategory(activity.getCategory());
			activityTmp.setStatus(activity.getStatus());
			activityTmp.setAttachment(activity.getAttachment());
			activityTmp.setComplement(activity.getComplement());
			//activityTmp.getAddress(activity.getAddress());
			activityTmp.setProof(activity.getProof());
			activityTmp.setLocation(activity.getLocation());

			activityRepository.update(activityTmp);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/{id}")
	//@PreAuthorize("hasAuthority('Admin') or hasAuthority('WRITEPROFILE')")
	public ResponseEntity<HttpStatus> deleteProfile(@PathVariable("id") int id){
		System.out.println(id);
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Activity activityTmp = activityRepository.findOneById(Long.valueOf(id));
		if(user != null && activityTmp != null ) {
			activityRepository.delete(Long.valueOf(id));
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
}
