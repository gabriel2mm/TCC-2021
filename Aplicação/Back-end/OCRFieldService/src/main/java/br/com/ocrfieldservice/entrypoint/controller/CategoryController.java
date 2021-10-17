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

import br.com.ocrfieldservice.core.entity.Category;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.CategoryRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@RestController
@RequestMapping(value = "/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

	@Autowired
	private CategoryRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:category') or hasAuthority('write:category')")
	public @ResponseBody ResponseEntity<List<Category>> getCategorys(){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null && user.getOrganization() != null)
			return new ResponseEntity<List<Category>>(repository.findByOrg(user.getOrganization()), HttpStatus.OK);
		
		
		return new ResponseEntity<List<Category>>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}
	
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:category') or hasAuthority('write:category')")
	public ResponseEntity<Category> getCategoryById(@PathVariable("id") final Long id) {
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Category category = repository.findOne(id);
		
		if(user != null && category != null) {			
			return new ResponseEntity<Category>(category, HttpStatus.OK);
		}
		
		return new ResponseEntity<Category>(new Category(),  HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:category')")
	public ResponseEntity<HttpStatus> deleteCategory(@PathVariable("id") Long id){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		Category category = repository.findOne(id);
		if(user != null && category != null) {
			repository.deleteId(id);
			return new ResponseEntity<HttpStatus>(HttpStatus.OK);
		}
		
		return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:category')")
	private ResponseEntity<String> createCategory(@RequestBody Category category){
	
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			repository.save(category);
			return new ResponseEntity<String>("Não foi possível criar Category!", HttpStatus.BAD_REQUEST);
		}
		
		
		return new ResponseEntity<String>("Não foi possível criar Category!", HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:category')")
	private ResponseEntity<String> updateCategory(@PathVariable("id") Long id,@RequestBody Category category){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			Category tmp = repository.findOne(category.getId());
			if(tmp != null) {
				tmp.setName(category.getName() != null ? category.getName() : tmp.getName());
				tmp.setDescription(category.getDescription() != null ? category.getDescription() : tmp.getDescription());
				tmp.setActive(category.isActive());
				tmp.setOrganization(user.getOrganization());
				tmp.setSkills(category.getSkills() != null ? category.getSkills() : tmp.getSkills());
				tmp.setCapacities(category.getCapacities() != null ? category.getCapacities() : tmp.getCapacities());
				tmp.setAutomaticAssignment(category.isAutomaticAssignment());
				tmp.setSla(category.getSla() != null ? category.getSla() : tmp.getSla());
				repository.update(category);
				
				return new ResponseEntity<String>("Category atualizado com sucesso!", HttpStatus.BAD_REQUEST);
			}
		}
		
		return new ResponseEntity<String>("Não foi possível Atualizar Category", HttpStatus.BAD_REQUEST);
	}
}
