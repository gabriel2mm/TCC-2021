package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.Skill;
import br.com.ocrfieldservice.core.entity.User;

@Repository
public interface SkillRepository {

	public List<Skill> findAll();
	
	public Skill findOne(final Long id);
	
	public void save(final Skill skill);
	
	public void update(final Skill skill);
	
	public void deleteId(final Long id);
	
	public List<Skill> findByOrg(final Organization org);
	
	public List<Skill> findByOrgId(final Long orgId);
	
	public List<Skill> findByUser(final User user);
	
	public List<Skill> findByUserById(final Long user);
}
