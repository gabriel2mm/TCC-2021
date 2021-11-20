package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Profile;

@Repository
public interface ProfileRepository {

	public void delete(final Long id);

	public void update(final Profile profile);

	public void save(final Profile profile);

	public List<Profile> findAllByOrg(final String orgName);

	public Profile findOneByName(final String profileName);

	public Profile findOneById(final Long id);
}
