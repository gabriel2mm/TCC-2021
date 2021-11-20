package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Capacity;
import br.com.ocrfieldservice.core.entity.Category;
import br.com.ocrfieldservice.core.entity.Organization;
import br.com.ocrfieldservice.core.entity.User;

@Repository
public interface CapacityRepository {

	public List<Capacity> findAll();

	public Capacity findOne(final Long id);

	public void save(final Capacity capacity);

	public void update(final Capacity capacity);

	public void deleteId(final Long id);

	public List<Capacity> findByOrg(final Organization org);

	public List<Capacity> findByOrgId(final Long orgId);

	public List<Capacity> findByCategory(final Category category);

	public List<Capacity> findByCategoryId(final Long categoryId);

	public List<Capacity> findByUser(final User user);

	public List<Capacity> findByUserId(final Long userId);

}
