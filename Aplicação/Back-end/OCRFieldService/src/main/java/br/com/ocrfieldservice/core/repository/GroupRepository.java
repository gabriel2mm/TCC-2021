package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.GroupUsers;
import br.com.ocrfieldservice.core.entity.Organization;

@Repository
public interface GroupRepository {

	public List<GroupUsers> findAll();
	
	public GroupUsers findOne(final Long id);
	
	public void save(final GroupUsers group);
	
	public void update(final GroupUsers group);
	
	public void deleteId(final Long id);
	
	public List<GroupUsers> findByOrg(final Organization org);
	
	public List<GroupUsers> findByOrgId(final Long orgId);
}
