package br.com.ocrfieldservice.dataprovider.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ocrfieldservice.core.entity.PasswordReset;

public interface PasswordResetDao extends JpaRepository<PasswordReset, Long>{

}
