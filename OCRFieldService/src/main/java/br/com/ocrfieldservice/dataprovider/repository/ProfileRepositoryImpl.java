package br.com.ocrfieldservice.dataprovider.repository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.Profile;
import br.com.ocrfieldservice.core.repository.ProfileRepository;
import br.com.ocrfieldservice.dataprovider.dao.ProfileDao;

@Repository
public class ProfileRepositoryImpl implements ProfileRepository, Serializable {

	private static final long serialVersionUID = 2599546702549389317L;

	@Autowired
	private ProfileDao profileDao;
	
	@Autowired
	private EntityManager entityManager;
	
	@Override
	public void save(Profile profile) {
		profileDao.save(profile);
		profileDao.flush();
	}

	@Override
	public void delete(Long id) {
		profileDao.deleteById(id);
	}

	@Override
	public void update(Profile profile) {
		Optional<Profile> profileTmp = profileDao.findById(profile.getId());
		if(profileTmp.isPresent()) {
			profileDao.saveAndFlush(profile);
		}
	}

	@Override
	public List<Profile> findAllByOrg(String orgName) {
		
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Profile> query = builder.createQuery(Profile.class);
		Root<Profile> root = query.from(Profile.class);
		Join<Profile,Organization> joinOrganizationProfile = root.join("org");
		
		query.where(builder.equal(joinOrganizationProfile.get("name"), orgName));
		
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public Profile findOneByName(String profileName) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Profile> query = builder.createQuery(Profile.class);
		Root<Profile> root = query.from(Profile.class);
		
		query.where(builder.equal(root.get("name"), profileName));
		
		List<Profile> profiles = entityManager.createQuery(query).getResultList();
		if(profiles.size() > 0 ) {
			return profiles.get(0);
		}
		
		return null;
	}

	@Override
	public Profile findOneById(Long id) {
		Optional<Profile> profileTmp = profileDao.findById(id);
		if(profileTmp.isPresent()) {
			return profileTmp.get();
		}
		
		return null;
	}

}
