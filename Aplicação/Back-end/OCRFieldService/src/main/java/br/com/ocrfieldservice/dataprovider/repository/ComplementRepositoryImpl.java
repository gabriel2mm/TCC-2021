package br.com.ocrfieldservice.dataprovider.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Activity;
import br.com.ocrfieldservice.core.entity.Complement;
import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.repository.ComplementRepository;
import br.com.ocrfieldservice.dataprovider.dao.ComplementDao;

@Repository
public class ComplementRepositoryImpl implements ComplementRepository {

	@Autowired ComplementDao dao;
	
	@Autowired EntityManager manager;

	@Override
	public void save(Complement entity) {
		// TODO Auto-generated method stub
		dao.saveAndFlush(entity);
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		dao.deleteById(id);
	}

	@Override
	public void update(Complement entity) {
		// TODO Auto-generated method stub
		dao.saveAndFlush(entity);
	}

	@Override
	public List<Complement> getAll(Organization org) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Complement getById(Long id) {
		Optional<Complement> complement = dao.findById(id);
		if(complement.isPresent())
			return complement.get();

		return null;
	}
	
	
}
