package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

import br.com.ocrfieldservice.core.entity.Permission;
import br.com.ocrfieldservice.core.entity.Profile;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.PermissionRepository;
import br.com.ocrfieldservice.core.repository.ProfileRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/profiles")
public class ProfilesController {

	@Autowired
	private ProfileRepository repository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PermissionRepository permissionRepository;

	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:profile') or hasAuthority('write:profile')")
	public ResponseEntity<List<Profile>> getAllProfilesByOrganization() {
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null && user.getOrganization() != null)
			return new ResponseEntity<>(repository.findAllByOrg(user.getOrganization().getName()), HttpStatus.OK);


		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:profile') or hasAuthority('write:profile')")
	public ResponseEntity<Profile> getProfileById(@PathVariable("id") final Long id) {
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Profile profile = repository.findOneById(id);

		if(user != null && profile != null && profile.getOrg() == user.getOrganization() ) {
			return new ResponseEntity<>(profile, HttpStatus.OK);
		}

		return new ResponseEntity<>(new Profile(),  HttpStatus.BAD_REQUEST);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:profile')")
	public ResponseEntity<HttpStatus> createProfile(@RequestBody Profile profile){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			profile.setActive(true);
			profile.setCreatedBy(user);
			profile.setOrg(user.getOrganization());
			profile.setCreatedBy(user);

			List<Permission> permissions = new ArrayList<>();
			for(Permission p : profile.getPermissions()) {
				Permission permission = permissionRepository.findByName(p.getPermission());
				if(permission != null) {
					permissions.add(permission);
				}else {
					Permission tmp = new Permission();
					tmp.setPermission(p.getPermission());
					permissionRepository.save(tmp);
					permissions.add(tmp);
				}
			}

			profile.setPermissions(permissions.stream().collect(Collectors.toSet()));

			repository.save(profile);

			return new ResponseEntity<>(HttpStatus.OK);
		}

		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:profile')")
	public ResponseEntity<HttpStatus> updateProfile(@PathVariable("id") Long id, @RequestBody Profile profile){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Profile profileTmp = repository.findOneById(id);
		if(user != null && profileTmp != null && profileTmp.getOrg() == user.getOrganization() ) {
			profileTmp.setCreatedBy(user);
			profileTmp.setOrg(user.getOrganization());
			profileTmp.setName(profile.getName());
			profileTmp.setDescription(profile.getDescription());
			profileTmp.setActive(profile.isActive());

			List<Permission> permissions = new ArrayList<>();
			for(Permission p : profile.getPermissions()) {
				Permission permission = permissionRepository.findByName(p.getPermission());
				if(permission != null) {
					permissions.add(permission);
				}else {
					Permission tmp = new Permission();
					tmp.setPermission(p.getPermission());
					permissionRepository.save(tmp);
					permissions.add(tmp);
				}
			}

			profileTmp.setPermissions(permissions.stream().collect(Collectors.toSet()));

			repository.update(profileTmp);
			return new ResponseEntity<>(HttpStatus.OK);
		}

		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:profile')")
	public ResponseEntity<HttpStatus> deleteProfile(@PathVariable("id") Long id){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Profile profileTmp = repository.findOneById(id);
		if(user != null && profileTmp != null && profileTmp.getOrg() == user.getOrganization() ) {
			repository.delete(id);
		}

		return new ResponseEntity<>(HttpStatus.OK);
	}

}
