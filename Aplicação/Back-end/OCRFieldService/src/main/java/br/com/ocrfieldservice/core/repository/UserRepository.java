package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.User;

@Repository("userRepository")
public interface UserRepository {

	public User save(User user);

	public List<User> findAll();

	public List<User> findUser(User user);

	public User findById(final Long id);

	public User findUser(final String email, final String password);

	public User findByEmail(final String email);

	public List<User> findByOrg(final Organization organization);

	public List<User> findByOrgId(final Long orgId);

	public Long countUsersByOrganizationId(final Long orgId);

	public void deleteById(final Long id);
}
