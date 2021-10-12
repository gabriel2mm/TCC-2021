package br.com.ocrfieldservice.dataprovider.repository;


import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.PasswordReset;
import br.com.ocrfieldservice.core.repository.PasswordResetRepository;
import br.com.ocrfieldservice.dataprovider.dao.PasswordResetDao;

@Repository
public class PasswordRepositoryImpl implements PasswordResetRepository, Serializable{

	private static final long serialVersionUID = -6904488891347069335L;

	@Autowired
	private PasswordResetDao passwordResetDao;
	
	@Autowired
	private EntityManager entityManager;
	
	@Override
	public PasswordReset findByToken(String token) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<PasswordReset> criteria = builder.createQuery(PasswordReset.class);
		Root<PasswordReset> root = criteria.from(PasswordReset.class);
		
		criteria.where(
				builder.equal(root.get("token"), token)
		);
		
		List<PasswordReset> passwords = entityManager.createQuery(criteria).getResultList();
		
		if(passwords.size() > 0) {
			return passwords.get(0);
		}
		
		
		return null;
	}

	@Override
	public void save(PasswordReset passwordReset) {
		passwordResetDao.save(passwordReset);
		passwordResetDao.flush();
	}

}
