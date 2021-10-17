package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.ChatRoom;
import br.com.ocrfieldservice.core.entity.Messages;
import br.com.ocrfieldservice.core.entity.User;

@Repository
public interface MessagesRepository {

	public void save(final Messages message);
	
	public List<Messages> findAll(final ChatRoom chatRoom);
	
	public List<Messages> findAll(final Long id);
	
	public List<Messages> findAll(final User user);
}
