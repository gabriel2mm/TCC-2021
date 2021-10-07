package br.com.ocrfieldservice.dataprovider.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ocrfieldservice.core.entity.Address;

public interface AddressDao extends JpaRepository<Address, Long> {
	

}
