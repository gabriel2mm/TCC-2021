package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Permission;

@Repository
public interface PermissionRepository {
	
	public List<Permission> findAllPermissions();
	
	public Permission findByName(final String name);
	
	public void save(Permission permissions);
}
