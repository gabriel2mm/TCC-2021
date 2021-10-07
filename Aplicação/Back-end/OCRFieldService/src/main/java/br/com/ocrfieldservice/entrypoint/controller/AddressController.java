package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
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

import br.com.ocrfieldservice.core.entity.Address;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.AddressRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@RestController
@RequestMapping(value = "/api/address")
@CrossOrigin(allowCredentials = "", allowedHeaders = "")
public class AddressController {

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private UserRepository userRepository;

	@GetMapping
	public ResponseEntity<List<Address>> getAllProfilesByOrganization() {
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			return new ResponseEntity<List<Address>>(addressRepository.findAllByOrg(user.getOrganization().getName()), HttpStatus.OK);
		}

		return new ResponseEntity<List<Address>>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}

	@GetMapping(value = "/{id}")
	//@PreAuthorize("hasAuthority('Admin') or hasAuthority('READ_PROFILE') or hasAuthority('WRITEPROFILE')")
	public ResponseEntity<Address> getProfileById(@PathVariable("id") final Long id) {
		System.out.println(id);
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Address address = addressRepository.findOneById(id);

		if(user != null && address != null) {			
			return new ResponseEntity<Address>(address, HttpStatus.OK);
		}

		return new ResponseEntity<Address>(new Address(),  HttpStatus.BAD_REQUEST);
	}

	@PostMapping
	//@PreAuthorize("hasAuthority('Admin') or hasAuthority('WRITEPROFILE')")
	public ResponseEntity<HttpStatus> createProfile(@RequestBody Address addres){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			addressRepository.save(addres);

			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
	}

	@PutMapping("/{id}")
	//@PreAuthorize("hasAuthority('Admin') or hasAuthority('WRITEPROFILE')")
	public ResponseEntity<HttpStatus> updateProfile(@PathVariable("id") Long id, @RequestBody Address address){
		System.out.println(id);
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Address addressTmp = addressRepository.findOneById(id);
		if(user != null && addressTmp != null ) {
			//address.setCreatedBy(user);
			//address.setOrg(user.getOrganization());
			
			
			addressTmp.setAddress(address.getAddress());
			addressTmp.setCEP(address.getCEP());
			addressTmp.setCity(address.getCity());
			addressTmp.setComplement(address.getComplement());
			addressTmp.setDistrict(address.getDistrict());
			addressTmp.setIat(address.getIat());
			addressTmp.setIng(address.getIng());
			addressTmp.setNumber(address.getNumber());
			addressTmp.setState(address.getState());
			

			addressRepository.update(addressTmp);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/{id}")
	//@PreAuthorize("hasAuthority('Admin') or hasAuthority('WRITEPROFILE')")
	public ResponseEntity<HttpStatus> deleteProfile(@PathVariable("id") int id){
		System.out.println(id);
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Address addressTmp = addressRepository.findOneById(Long.valueOf(id));
		if(user != null && addressTmp != null ) {
			addressRepository.delete(Long.valueOf(id));
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.OK);
	}
}
