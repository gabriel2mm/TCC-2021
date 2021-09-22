package br.com.ocrfieldservice.core.repository;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Organization;

@Repository
public interface OrganizationRepository {
	
	public void save(Organization organization);
}
