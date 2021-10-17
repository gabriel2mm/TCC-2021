package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import br.com.ocrfieldservice.core.entity.ChatRoom;
import br.com.ocrfieldservice.core.entity.Messages;
import br.com.ocrfieldservice.core.repository.ChatRoomRepository;
import br.com.ocrfieldservice.core.repository.MessagesRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;
import br.com.ocrfieldservice.entrypoint.viewModel.ChatMessage;

@Controller
public class ChatController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MessagesRepository messageRepository;
	
	@Autowired
	private ChatRoomRepository chatRoomRepository; 
	
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
    	
    	ChatRoom chatRoom = chatRoomRepository.findOne(chatMessage.getChatRoom());
    	
    	Messages message = new Messages();    	
    	message.setChatRoom(chatRoom);
    	message.setTo(userRepository.findById(chatMessage.getTo().getId()));
    	message.setFrom(userRepository.findById(chatMessage.getFrom().getId()));
    	message.setCreated(new Date());
    	message.setMessage(chatMessage.getContent());
    	
    	messageRepository.save(message);
    	
    	List<Messages> messages = chatRoom.getMessages() != null && chatRoom.getMessages().size() > 0 ? chatRoom.getMessages() : new ArrayList<Messages>();
    	messages.add(message);
    	chatRoom.setMessages(messages);
    	chatRoom.setNotificiation(true);

    	chatRoomRepository.save(chatRoom);
    	
        return chatMessage;
    }
}
