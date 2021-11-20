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

import br.com.ocrfieldservice.core.entity.Capacity;
import br.com.ocrfieldservice.core.entity.Category;
import br.com.ocrfieldservice.core.entity.SLA;
import br.com.ocrfieldservice.core.entity.Skill;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.CapacityRepository;
import br.com.ocrfieldservice.core.repository.CategoryRepository;
import br.com.ocrfieldservice.core.repository.SLARepository;
import br.com.ocrfieldservice.core.repository.SkillRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired UserRepository useRepository;

	@Autowired CategoryRepository repository;

	@Autowired CapacityRepository capacityRepository;

	@Autowired SkillRepository skillRepository;

	@Autowired SLARepository slaRepository;


	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:category') or hasAuthority('write:category')")
	public @ResponseBody ResponseEntity<List<Category>> getAllCategories(Authentication authentication){
		User userLogged = useRepository.findByEmail(authentication.getName());
		if(userLogged!= null && userLogged.getOrganization() != null) {
			return new ResponseEntity<>(repository.findByOrg(userLogged.getOrganization()), HttpStatus.OK);
		}

		return new ResponseEntity<>( new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:category') or hasAuthority('write:category')")
	public @ResponseBody ResponseEntity<Category> getOneCategory(Authentication authentication, @PathVariable("id") long id){
		User userLogged = useRepository.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null	){
			return new ResponseEntity<>(repository.findOne(id), HttpStatus.OK);
		}

		return new ResponseEntity<>( new Category() , HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:category')")
	public @ResponseBody ResponseEntity<String> deleteCategory(Authentication authentication, @PathVariable("id") long id){
		User userLogged = useRepository.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null	){
			repository.deleteId(id);
			return new ResponseEntity<>("Deletado com sucesso!", HttpStatus.OK);
		}

		return new ResponseEntity<>("Não foi possível deletar registro!", HttpStatus.BAD_REQUEST);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:category')")
	public @ResponseBody ResponseEntity<String> createCategory(Authentication authentication, @RequestBody Category category){
		User userLogged = useRepository.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null	){
			category.setActive(true);
			category.setOrganization(userLogged.getOrganization());
			category.setCreatedBy(userLogged);

			if(category.getSla() != null) {
				SLA sla = slaRepository.findOne(category.getSla().getId());
				if(sla != null) {
					category.setSla(sla);
				}

			}

			repository.save(category);
			return new ResponseEntity<>("Registro criado com sucesso!", HttpStatus.OK);
		}

		return new ResponseEntity<>("Não foi possível criar registro", HttpStatus.BAD_REQUEST);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:category')")
	public @ResponseBody ResponseEntity<String> updateCategory(Authentication authentication, @PathVariable("id") long id, @RequestBody Category category){
		User userLogged = useRepository.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null	){
			Category categoryTpm = repository.findOne(id);

			if(categoryTpm != null) {
				categoryTpm.setActive(category.isActive());
				categoryTpm.setName(category.getName());
				categoryTpm.setDescription(category.getDescription());
				categoryTpm.setAutomaticAssignment(category.isAutomaticAssignment());
				categoryTpm.setOrganization(userLogged.getOrganization());

				if(category.getSla() != null) {
					SLA sla = slaRepository.findOne(category.getSla().getId());
					categoryTpm.setSla(sla);
				}

				Set<Skill> skills = new HashSet<>();
				for(Skill skill : category.getSkills()) {
					Skill tmp = skillRepository.findOne(skill.getId());
					if(tmp != null) {
						skills.add(tmp);
					}
				}

				categoryTpm.setSkills(skills);

				Set<Capacity> capacities = new HashSet<>();
				for(Capacity capacity : category.getCapacities()) {
					Capacity tmp = capacityRepository.findOne(capacity.getId());
					if(tmp != null) {
						capacities.add(tmp);
					}
				}

				categoryTpm.setCapacities(capacities);

				repository.update(categoryTpm);
				return new ResponseEntity<>("Registro atualizado com sucesso!", HttpStatus.OK);
			}

		}

		return new ResponseEntity<>("Não foi atualizar registro!", HttpStatus.BAD_REQUEST);
	}
}
