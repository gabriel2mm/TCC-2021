package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ocrfieldservice.core.entity.SLA;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.SLARepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/slas")
public class SLAsController {


	@Autowired UserRepository userRep;

	@Autowired SLARepository repository;


	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:sla') or hasAuthority('write:sla')")
	public @ResponseBody ResponseEntity<List<SLA>> gettALlSlas(Authentication authentication){

		User userLogged = userRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<>(repository.findByOrg(userLogged.getOrganization()), HttpStatus.OK);
		}


		return new ResponseEntity<>(new ArrayList<SLA>(), HttpStatus.BAD_REQUEST);
	}


	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:sla') or hasAuthority('write:sla')")
	public @ResponseBody ResponseEntity<SLA> getOneSLA(Authentication authentication, @PathVariable("id") long id){

		User userLogged = userRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			return new ResponseEntity<>(repository.findOne(id), HttpStatus.OK);
		}


		return new ResponseEntity<>(new SLA(), HttpStatus.BAD_REQUEST);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:sla')")
	public @ResponseBody ResponseEntity<String> createSLA(Authentication authentication, @RequestBody SLA sla){
		User userLogged = userRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			sla.setOrganization(userLogged.getOrganization());
			sla.setCreatedBy(userLogged);
			sla.setActive(true);
			repository.save(sla);

			return new ResponseEntity<>("Criado com sucesso!", HttpStatus.OK);
		}

		return new ResponseEntity<>("Falha ao criar SLA!", HttpStatus.BAD_REQUEST);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:sla')")
	public @ResponseBody ResponseEntity<String> updateSla(Authentication authentication, @PathVariable("id") long id, @RequestBody SLA sla){
		User userLogged = userRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			SLA slaTmp = repository.findOne(id);
			if(slaTmp != null) {
				slaTmp.setActive(sla.isActive());
				slaTmp.setCreatedBy(userLogged);
				slaTmp.setOrganization(userLogged.getOrganization());
				slaTmp.setName(sla.getName());
				slaTmp.setDescription(sla.getDescription());
				slaTmp.setTime(sla.getTime());
				slaTmp.setUnity(sla.getUnity());

				repository.save(slaTmp);

				return new ResponseEntity<>("Atualizado com sucesso!", HttpStatus.OK);
			}
		}


		return new ResponseEntity<>("Falha ao atualizar SLA!", HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:sla')")
	public @ResponseBody ResponseEntity<String> deleteSLA(Authentication authentication, @PathVariable("id") long id){
		User userLogged = userRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			repository.deleteId(id);

			return new ResponseEntity<>("Deletado com sucesso!", HttpStatus.OK);
		}

		return new ResponseEntity<>("Falha ao deletar SLA!", HttpStatus.BAD_REQUEST);
	}
}
