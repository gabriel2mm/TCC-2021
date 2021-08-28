package br.com.ocrfieldservice.core.usecase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.UserRepository;

@Service("Sigin")
public class Sigin {

	//Aqui será chamado direto do controller.
	//adapter tem que ser o entity do core
	public boolean sigin(User user) {
		
		return false;
	}
	
}
