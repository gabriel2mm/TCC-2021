package br.com.ocrfieldservice.dataprovider.repository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.SLA;
import br.com.ocrfieldservice.core.repository.SLARepository;
import br.com.ocrfieldservice.dataprovider.dao.SLADao;

@Repository
public class SLARepositoryImpl implements SLARepository, Serializable {

	private static final long serialVersionUID = -3858612210661050875L;

	@Autowired
	private SLADao slaDao;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<SLA> findAll() {
		return slaDao.findAll();
	}

	@Override
	public SLA findOne(Long id) {
		Optional<SLA> sla = slaDao.findById(id);
		if (sla.isPresent())
			return sla.get();

		return null;
	}

	@Override
	public void save(SLA sla) {
		slaDao.saveAndFlush(sla);
	}

	@Override
	public void update(SLA sla) {
		slaDao.saveAndFlush(sla);
	}

	@Override
	public void deleteId(Long id) {
		if (id != null)
			slaDao.deleteById(id);
	}

	@Override
	public List<SLA> findByOrg(Organization organization) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<SLA> query = builder.createQuery(SLA.class);
		Root<SLA> root = query.from(SLA.class);
		Join<SLA, Organization> joinSLAOganization = root.join("organization");

		query.select(root).distinct(true)
				.where(builder.or(builder.equal(joinSLAOganization.get("name"), organization.getName()),
						builder.equal(joinSLAOganization.get("id"), organization.getId())));

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<SLA> findByOrgId(Long orgId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<SLA> query = builder.createQuery(SLA.class);
		Root<SLA> root = query.from(SLA.class);
		Join<SLA, Organization> joinSLAOganization = root.join("organization");

		query.select(root).distinct(true).where(builder.equal(joinSLAOganization.get("id"), orgId));

		return entityManager.createQuery(query).getResultList();
	}

}
