package br.com.ocrfieldservice.contracts;

import org.springframework.stereotype.Service;

import br.com.ocrfieldservice.core.entity.Address;
import br.com.ocrfieldservice.core.repository.AddressRepository;

@Service
public interface AdressService {

	public default Address updateAddress(Long id, AddressRepository addressRepository) {
        Address address = addressRepository.findById(id);

        if(address != null) {
        	System.out.println(address);
            return address;
        }
        
        return null;
    }
}
