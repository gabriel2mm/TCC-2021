package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

import br.com.ocrfieldservice.core.entity.Skill;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.SkillRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/skills")
public class SkillsController {

	@Autowired UserRepository useRep;

	@Autowired SkillRepository repository;

	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:skill') or hasAuthority('write:skill')")
	public @ResponseBody ResponseEntity<List<Skill>> getAllSkills(Authentication authentication){
		User userLogged  = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null){
			return new ResponseEntity<>(repository.findByOrg(userLogged.getOrganization()), HttpStatus.OK);
		}

		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:skill') or hasAuthority('write:skill')")
	public @ResponseBody ResponseEntity<Skill> getOneSkill(Authentication authentication, @PathVariable("id") long id){
		User userLogged  = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null){
			return new ResponseEntity<>(repository.findOne(id), HttpStatus.OK);
		}

		return new ResponseEntity<>(new Skill(), HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:skill')")
	public @ResponseBody ResponseEntity<String> deleteSkill(Authentication authentication, @PathVariable("id") long id){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			repository.deleteId(id);
			return new ResponseEntity<>("Deletado com sucesso!", HttpStatus.OK);
		}

		return new ResponseEntity<>("Falha ao deletar Skill!" , HttpStatus.BAD_REQUEST);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:skill')")
	public @ResponseBody ResponseEntity<String> createSkill(Authentication authentication, @RequestBody Skill skill){
		User userLogged = useRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			skill.setCreatedBy(userLogged);
			skill.setOrganization(userLogged.getOrganization());
			skill.setActive(true);
			repository.save(skill);

			return new ResponseEntity<>("creado com sucesso!" , HttpStatus.OK);
		}

		return new ResponseEntity<>("Falha ao criar Skill!", HttpStatus.BAD_REQUEST);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:skill')")
	public @ResponseBody ResponseEntity<String> updateSkill(Authentication authentication, @PathVariable("id") long id, @RequestBody Skill skill){
		User userLogged = useRep.findByEmail(authentication.getName());
		Skill skillTmp = repository.findOne(id);
		if(userLogged != null && userLogged.getOrganization() != null && skillTmp != null) {
			skillTmp.setName(skill.getName());
			skillTmp.setDescription(skill.getDescription());
			skillTmp.setActive(skill.isActive());

			Set<User> users = new HashSet<>();
			for(User user : skill.getUsers()) {
				User tmp = useRep.findById(user.getId());
				if(tmp != null) {
					users.add(tmp);
				}
			}

			skillTmp.setUsers(users);
			repository.save(skillTmp);

			return new ResponseEntity<>("Atualizado com sucesso!", HttpStatus.OK);
		}

		return new ResponseEntity<>("Falha ao atualizar", HttpStatus.BAD_REQUEST);
	}
}
