package br.com.ocrfieldservice.dataprovider.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ocrfieldservice.core.entity.Proof;

public interface ProofDao extends JpaRepository<Proof, Long>  {

}
