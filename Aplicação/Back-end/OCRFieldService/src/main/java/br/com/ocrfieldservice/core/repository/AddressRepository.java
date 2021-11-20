package br.com.ocrfieldservice.core.repository;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Address;

@Repository
public interface AddressRepository extends GenericCRUD<Address, Long>{

}
