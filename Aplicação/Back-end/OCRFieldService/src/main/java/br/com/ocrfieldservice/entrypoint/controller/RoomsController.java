package br.com.ocrfieldservice.entrypoint.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ocrfieldservice.core.entity.ChatRoom;
import br.com.ocrfieldservice.core.entity.Messages;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.ChatRoomRepository;
import br.com.ocrfieldservice.core.repository.MessagesRepository;
import br.com.ocrfieldservice.core.repository.UserRepository;

@RestController
@RequestMapping(value = "/api/rooms")
@CrossOrigin(origins = "*")
public class RoomsController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ChatRoomRepository chatRoomRepository;

	@Autowired
	private MessagesRepository messagesRepository;

	@GetMapping("/contacts")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('admin:chat')")
	public List<User> getContactList(@RequestParam(name = "id") final Long id){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {
			return userRepository.findByOrgId(id).stream().filter(u -> u.getId() != user.getId()).collect(Collectors.toList());
		}

		return new ArrayList<>();
	}

	@PostMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('admin:chat')")
	public @ResponseBody ResponseEntity<ChatRoom> createChatRoom (@RequestBody ChatRoom chatRoom){
		User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user != null) {

			User user1 = userRepository.findById(chatRoom.getUser1().getId());
			User user2 = userRepository.findById(chatRoom.getUser2().getId());
			List<ChatRoom> chats = chatRoomRepository.findAll(user1, user2);
			if(chats !=null && chats.size() > 0) {
				return new ResponseEntity<>(chats.get(0), HttpStatus.OK);
			}

			chatRoom.setUser1(userRepository.findById(chatRoom.getUser1().getId()));
			chatRoomRepository.save(chatRoom);
			return new ResponseEntity<>(chatRoom, HttpStatus.OK);
		}
		return new ResponseEntity<>(new ChatRoom(), HttpStatus.BAD_REQUEST);
	}

	@GetMapping
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('admin:chat')")
	public List<ChatRoom> getAllRooms(@RequestParam(name = "id") final Long userId){
		return chatRoomRepository.findAllByUser(userId);
	}

	@GetMapping("/messages")
	@PreAuthorize("hasAuthority('Admin') or hasAuthority('admin:chat')")
	public List<Messages> getAllMessages(@RequestParam(name="id") final Long roomId){
		return messagesRepository.findAll(roomId);
	}
}
