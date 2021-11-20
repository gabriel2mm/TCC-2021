package br.com.ocrfieldservice.dataprovider.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Address;
import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.repository.AddressRepository;
import br.com.ocrfieldservice.dataprovider.dao.AddressDao;

@Repository
public class AddressRepositoryImpl implements AddressRepository {
	
	@Autowired AddressDao dao;
	
	@Autowired EntityManager entityManager;
	
	
	@Override
	public void save(Address entity) {
		// TODO Auto-generated method stub
		dao.saveAndFlush(entity);
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		dao.deleteById(id);
	}

	@Override
	public void update(Address entity) {
		// TODO Auto-generated method stub
		dao.saveAndFlush(entity);
	}

	@Override
	public List<Address> getAll(Organization org) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Address getById(Long id) {
		// TODO Auto-generated method stub
		return dao.getById(id);
	}

}
