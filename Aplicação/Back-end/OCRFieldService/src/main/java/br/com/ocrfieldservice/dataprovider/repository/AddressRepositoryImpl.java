package br.com.ocrfieldservice.dataprovider.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.Address;
import br.com.ocrfieldservice.core.repository.AddressRepository;
import br.com.ocrfieldservice.dataprovider.dao.AddressDao;

@Repository
public class AddressRepositoryImpl implements AddressRepository {

	@PersistenceContext
    private EntityManager entityManager;
	
	@Autowired
	private AddressDao addressDao;

	@Override
	public Address save(Address address) {
		return addressDao.save(address);
	}

	@Override
	public List<Address> findAll() {
		return addressDao.findAll();
	}

	@Override
	public List<Address> findAddress(Address address) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Address> criteria = builder.createQuery(Address.class);
		Root<Address> root = criteria.from(Address.class);
		criteria.distinct(true)
			.select(root)
			.where(builder.or(
					/*builder.like(root.get("firstName"), address.getFirstName()),
					builder.like(root.get("lastName"), address.getLastName()),
					builder.like(root.get("email"), address.getEmail())*/
			));
		return entityManager.createQuery(criteria).getResultList();
	}

	@Override
	public Address findById(Long id) {
		return addressDao.getById(id);
	}

    @Override
    public void update(Address address) {
        Optional<Address> profileTmp = addressDao.findById(address.getId());
        if(profileTmp.isPresent()) {
        	addressDao.saveAndFlush(address);
        }
    }

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Address> findAllByOrg(String orgName) {
		// TODO Auto-generated method stub
		return null;
	}

    @Override
    public Address findOneById(Long id) {
        Optional<Address> addressTmp = addressDao.findById(id);
        if(addressTmp.isPresent()) {
            return addressTmp.get();
        }
        return null;
    }

}
