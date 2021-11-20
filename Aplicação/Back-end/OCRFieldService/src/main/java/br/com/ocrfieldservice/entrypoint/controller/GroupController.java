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

import br.com.ocrfieldservice.core.entity.GroupUsers;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.GroupRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/groups")
public class GroupController {

	@Autowired GroupRepository repository;

	@Autowired UserRepository userRep;

	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:group')")
	public @ResponseBody ResponseEntity<String> saveGroup(Authentication authentication, @RequestBody GroupUsers groups) {
		User userLogged = userRep.findByEmail(authentication.getName());
		if(userLogged != null && userLogged.getOrganization() != null) {
			groups.setCreatedBy(userLogged);
			groups.setOrganization(userLogged.getOrganization());
			groups.setActive(true);
			repository.save(groups);

			return new ResponseEntity<>("Grupo criado com sucesso! ", HttpStatus.OK);
		}

		return new ResponseEntity<>("Falha ao criar grupo!", HttpStatus.BAD_REQUEST);
	}

	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:group') or hasAuthority('write:group')")
	public @ResponseBody ResponseEntity<List<GroupUsers>> getAllGroups(Authentication authentication){
		User userLogged = userRep.findByEmail(authentication.getName());
		if(userLogged != null) {
			return new ResponseEntity<>(repository.findByOrg(userLogged.getOrganization()), HttpStatus.OK);
		}

		return new ResponseEntity<>( new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('read:group') or hasAuthority('write:group')")
	public @ResponseBody ResponseEntity<GroupUsers> getOne(Authentication authentication, @PathVariable("id") long id){
		User userLogged = userRep.findByEmail(authentication.getName());
		if(userLogged != null) {
			return new ResponseEntity<>(repository.findOne(id), HttpStatus.OK);
		}

		return new ResponseEntity<>( new GroupUsers(), HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:group')")
	public @ResponseBody ResponseEntity<String> deleteById(Authentication authentication, @PathVariable("id") long id){
		User userLogged = userRep.findByEmail(authentication.getName());
		if(userLogged != null) {
			repository.deleteId(id);

			return new ResponseEntity<>("Registro deletado com sucesso!" , HttpStatus.OK);
		}

		return new ResponseEntity<>("Falha ao deletar registro" , HttpStatus.BAD_REQUEST);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('write:group')")
	public @ResponseBody ResponseEntity<String> updateGroup(Authentication authentication, @PathVariable("id") long id, @RequestBody GroupUsers groups) {
		User userLogged = userRep.findByEmail(authentication.getName());

		GroupUsers groupsTmp = repository.findOne(id);

		if(userLogged != null && userLogged.getOrganization() != null && groupsTmp != null) {
			groupsTmp.setName(groups.getName());
			groupsTmp.setDescription(groups.getDescription());
			groupsTmp.setActive(groups.isActive());
			groupsTmp.setCreatedBy(userLogged);
			groupsTmp.setOrganization(userLogged.getOrganization());

			Set<User> users = new HashSet<>();
			for(User user : groups.getUsers()) {
				User tmp = userRep.findById(user.getId());
				if(tmp != null) {
					users.add(tmp);
				}
			}

			groupsTmp.setUsers(users);

			repository.update(groupsTmp);

			return new ResponseEntity<>("Grupo atualizado com sucesso! ", HttpStatus.OK);
		}

		return new ResponseEntity<>("Falha ao atualizar grupo!", HttpStatus.BAD_REQUEST);
	}

}


