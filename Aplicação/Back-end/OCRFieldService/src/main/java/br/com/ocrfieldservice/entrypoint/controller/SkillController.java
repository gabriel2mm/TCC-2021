package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ocrfieldservice.core.entity.Skill;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.SkillRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@RestController
@RequestMapping(value = "/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

	@Autowired
	private SkillRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:skill') or hasAuthority('write:skill')")
	public @ResponseBody ResponseEntity<List<Skill>> getSkills(){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null && user.getOrganization() != null)
			return new ResponseEntity<List<Skill>>(repository.findByOrg(user.getOrganization()), HttpStatus.OK);
		
		
		return new ResponseEntity<List<Skill>>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}
	
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:skill') or hasAuthority('write:skill')")
	public ResponseEntity<Skill> getSkillById(@PathVariable("id") final Long id) {
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Skill skill = repository.findOne(id);
		
		if(user != null && skill != null) {			
			return new ResponseEntity<Skill>(skill, HttpStatus.OK);
		}
		
		return new ResponseEntity<Skill>(new Skill(),  HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:skill')")
	public ResponseEntity<HttpStatus> deleteSkill(@PathVariable("id") Long id){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Skill skill = repository.findOne(id);
		if(user != null && skill != null) {
			repository.deleteId(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}
		
		return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:skill')")
	private ResponseEntity<String> createSkill(@RequestBody Skill skill){
	
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			repository.save(skill);
			return new ResponseEntity<String>("Não foi possível criar Skill!", HttpStatus.BAD_REQUEST);
		}
		
		
		return new ResponseEntity<String>("Não foi possível criar Skill!", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:skill')")
	private ResponseEntity<String> updateSkill(@PathVariable("id") Long id,@RequestBody Skill skill){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			Skill tmp = repository.findOne(skill.getId());
			if(tmp != null) {
				tmp.setName(skill.getName() != null ? skill.getName() : tmp.getName());
				tmp.setDescription(skill.getDescription() != null ? skill.getDescription() : tmp.getDescription());
				tmp.setActive(skill.isActive());
				tmp.setOrganization(user.getOrganization());
				tmp.setCategory(skill.getCategory() != null ? skill.getCategory() : tmp.getCategory());
				tmp.setUsers(skill.getUsers() != null ? skill.getUsers() : tmp.getUsers());
				repository.update(skill);
				
				return new ResponseEntity<String>("Skill atualizado com sucesso!", HttpStatus.BAD_REQUEST);
			}
		}
		
		return new ResponseEntity<String>("Não foi possível Atualizar Skill", HttpStatus.BAD_REQUEST);
	}
}
