package br.com.ocrfieldservice.dataprovider.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ocrfieldservice.core.entity.Activity;

public interface ActivityDao extends JpaRepository<Activity, Long> {
	

}
