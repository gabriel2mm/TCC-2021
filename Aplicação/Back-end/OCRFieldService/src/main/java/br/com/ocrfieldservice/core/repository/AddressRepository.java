package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Address;

@Repository
public interface AddressRepository {

	public Address save(Address address);

	public void update(final Address address);

	public void delete(final Long id);

	public List<Address> findAll();

	public List<Address> findAddress(Address address);

	//public Address findUser(final String email, final String password);

	public List<Address> findAllByOrg(final String orgName);

	public Address findOneById(final Long id);

	public Address findById(Long id);
}
