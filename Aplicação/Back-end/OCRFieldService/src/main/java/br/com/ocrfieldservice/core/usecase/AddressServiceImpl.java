package br.com.ocrfieldservice.core.usecase;

import org.springframework.stereotype.Service;

import br.com.ocrfieldservice.contracts.AdressService;
import br.com.ocrfieldservice.core.entity.Address;
import br.com.ocrfieldservice.core.repository.AddressRepository;

@Service
public class AddressServiceImpl implements AdressService{
	
	
	@Override
	public Address updateAddress(Long id, AddressRepository addressRepository) {
		return AdressService.super.updateAddress(id, addressRepository);
	}

}
