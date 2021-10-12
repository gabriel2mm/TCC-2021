package br.com.ocrfieldservice.dataprovider.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ocrfieldservice.core.entity.Capacity;

public interface CapacityDao extends JpaRepository<Capacity, Long>{

}
