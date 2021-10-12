package br.com.ocrfieldservice.dataprovider.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ocrfieldservice.core.entity.SLA;

public interface SLADao extends JpaRepository<SLA, Long> {

}
