package br.com.ocrfieldservice.core.repository;

import java.util.List;

import br.com.ocrfieldservice.core.entity.Organization;

public interface GenericCRUD<T, S> {
	
	public void save(T entity);
	
	public void delete(S id);
	
	public void update(T entity);
	
	public List<T> getAll(Organization org);
	
	public T getById(S id);

}
