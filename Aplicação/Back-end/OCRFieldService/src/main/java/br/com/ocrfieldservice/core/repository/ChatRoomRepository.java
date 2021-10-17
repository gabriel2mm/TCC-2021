package br.com.ocrfieldservice.core.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.ChatRoom;
import br.com.ocrfieldservice.core.entity.User;

@Repository
public interface ChatRoomRepository {
	
	public void save(final ChatRoom chatRoom);
	
	public ChatRoom findOne(final Long id);
	
	public List<ChatRoom> findAll(final User user1, final User user2);
	
	public List<ChatRoom> findAllByUser(final long userId);
	
}
