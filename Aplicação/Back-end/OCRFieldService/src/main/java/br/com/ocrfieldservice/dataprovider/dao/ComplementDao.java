package br.com.ocrfieldservice.dataprovider.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ocrfieldservice.core.entity.Complement;

public interface ComplementDao extends JpaRepository<Complement, Long> {

}
