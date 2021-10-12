package br.com.ocrfieldservice.dataprovider.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.repository.OrganizationRepository;
import br.com.ocrfieldservice.dataprovider.dao.OrganizationDao;

@Repository
public class OrganizationRepositoryImpl implements OrganizationRepository {

	@Autowired
	private OrganizationDao organizationDao;
	
	@Override
	public void save(Organization organization) {
		organizationDao.saveAndFlush(organization);
	}

}
