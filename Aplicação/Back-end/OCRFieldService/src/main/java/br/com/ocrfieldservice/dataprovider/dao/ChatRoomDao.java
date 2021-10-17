package br.com.ocrfieldservice.dataprovider.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ocrfieldservice.core.entity.ChatRoom;

public interface ChatRoomDao extends JpaRepository<ChatRoom, Long> {

}
