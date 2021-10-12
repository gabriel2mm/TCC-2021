package br.com.ocrfieldservice.dataprovider.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Permission;
import br.com.ocrfieldservice.core.repository.PermissionRepository;
import br.com.ocrfieldservice.dataprovider.dao.PermissionDao;

@Repository
public class PermissionRepositoryImpl implements PermissionRepository, Serializable{

	private static final long serialVersionUID = -1952909681968826648L;
	
	@Autowired
	private PermissionDao permissionDao;
	
	@Override
	public void save(Permission permission) {
		permissionDao.save(permission);
		permissionDao.flush();
	}

	@Override
	public List<Permission> findAllPermissions() {
		return permissionDao.findAll();
	}
}
