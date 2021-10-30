package br.com.ocrfieldservice.dataprovider.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ocrfieldservice.core.entity.TokenIntegration;

public interface TokenIntegrationDao extends JpaRepository<TokenIntegration, Long> {

}
