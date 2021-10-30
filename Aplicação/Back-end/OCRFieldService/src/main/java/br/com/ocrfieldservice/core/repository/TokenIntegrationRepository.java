package br.com.ocrfieldservice.core.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.TokenIntegration;

@Repository
public interface TokenIntegrationRepository extends Serializable {
	
	public void Save(final TokenIntegration tokenIntegrarion);
	
	public List<TokenIntegration> getAllByOrganization(final long id);
	
	public void DeleteToken(final long id);
}	

