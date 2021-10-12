package br.com.ocrfieldservice.dataprovider.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ocrfieldservice.core.entity.Organization;

public interface OrganizationDao extends JpaRepository<Organization, Long> {

}
