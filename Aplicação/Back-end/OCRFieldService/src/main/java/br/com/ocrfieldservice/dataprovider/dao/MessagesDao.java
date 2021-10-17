package br.com.ocrfieldservice.dataprovider.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ocrfieldservice.core.entity.Messages;

public interface MessagesDao extends JpaRepository<Messages, Long> {

}
