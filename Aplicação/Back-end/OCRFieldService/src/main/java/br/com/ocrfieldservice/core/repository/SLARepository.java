package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.SLA;

@Repository
public interface SLARepository {

	public List<SLA> findAll();

	public SLA findOne(final Long id);

	public void save(final SLA sla);

	public void update(final SLA sla);

	public void deleteId(final Long id);

	public List<SLA> findByOrg(final Organization org);

	public List<SLA> findByOrgId(final Long orgId);
}
