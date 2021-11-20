package br.com.ocrfieldservice.dataprovider.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.TokenIntegration;
import br.com.ocrfieldservice.core.repository.TokenIntegrationRepository;
import br.com.ocrfieldservice.dataprovider.dao.TokenIntegrationDao;

@Repository
public class TokenIntegrationRepositoryImpl implements TokenIntegrationRepository {

	/**
	 *
	 */
	private static final long serialVersionUID = -1618302751648169674L;

	@Autowired
	private TokenIntegrationDao dao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public void Save(TokenIntegration tokenIntegrarion) {
		dao.saveAndFlush(tokenIntegrarion);
	}

	@Override
	public List<TokenIntegration> getAllByOrganization(long id) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<TokenIntegration> query = builder.createQuery(TokenIntegration.class);

		Root<TokenIntegration> root = query.from(TokenIntegration.class);
		Join<TokenIntegration, Organization> joinTokenOrganization = root.join("org");

		query.select(root).distinct(true).where(
			builder.equal(joinTokenOrganization.get("id"), id)
		);

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public void DeleteToken(long id) {
		dao.deleteById(id);
	}

}
