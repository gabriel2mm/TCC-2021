package br.com.ocrfieldservice.dataprovider.repository;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

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

	@Autowired
	private EntityManager entityManager;

	@Override
	public void save(Permission permission) {
		permissionDao.save(permission);
		permissionDao.flush();
	}

	@Override
	public List<Permission> findAllPermissions() {
		return permissionDao.findAll();
	}

	@Override
	public Permission findByName(String name) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Permission> query  = builder.createQuery(Permission.class);
		Root<Permission> root = query.from(Permission.class);

		query.distinct(true).select(root).where(builder.equal(root.get("permission"), name));

		List<Permission> permissions = entityManager.createQuery(query).getResultList();

		if(permissions.size() > 0) {
			return permissions.get(0);
		}

		return null;
	}
}
