package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Category;
import br.com.ocrfieldservice.core.entity.Organization;

@Repository
public interface CategoryRepository {

public List<Category> findAll();
	
	public Category findOne(final Long id);
	
	public void save(final Category category);
	
	public void update(final Category category);
	
	public void deleteId(final Long id);
	
	public List<Category> findByOrg(final Organization org);
	
	public List<Category> findByOrgId(final Long orgId);
}
