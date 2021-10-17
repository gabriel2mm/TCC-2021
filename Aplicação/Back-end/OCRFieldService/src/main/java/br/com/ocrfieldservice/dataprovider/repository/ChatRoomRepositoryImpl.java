package br.com.ocrfieldservice.dataprovider.repository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.ChatRoom;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.ChatRoomRepository;
import br.com.ocrfieldservice.dataprovider.dao.ChatRoomDao;

@Repository
public class ChatRoomRepositoryImpl implements ChatRoomRepository, Serializable {

	private static final long serialVersionUID = -3520093232493640360L;

	@Autowired
	private ChatRoomDao dao;
	
	@Autowired
	private EntityManager entityManager;
	
	@Override
	public void save(ChatRoom chatRoom) {
		dao.saveAndFlush(chatRoom);
	}

	@Override
	public ChatRoom findOne(Long id) {
		Optional<ChatRoom> chatroom = dao.findById(id);
		
		if(chatroom.isPresent()) {
			return chatroom.get();
		}
		
		return null;
	}

	@Override
	public List<ChatRoom> findAll(final User user1, final User user2) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<ChatRoom> query = builder.createQuery(ChatRoom.class);
		Root<ChatRoom> root = query.from(ChatRoom.class);
		
		query.select(root).distinct(true).where(
				builder.or(
						builder.and(
								builder.equal(root.get("user1"), user1),
								builder.equal(root.get("user2"), user2)
						),
						builder.and(
								builder.equal(root.get("user1"), user2),
								builder.equal(root.get("user2"), user1)
						)
				)
		);
		
		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<ChatRoom> findAllByUser(long userId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<ChatRoom> query = builder.createQuery(ChatRoom.class);
		Root<ChatRoom> root = query.from(ChatRoom.class);
		Join<ChatRoom, User> joinChatRoomUser = root.join("user1");
		Join<ChatRoom, User> joinChatRoomUser2 = root.join("user2");
		
		query.select(root).distinct(true).where(
				builder.or(
					builder.equal(joinChatRoomUser.get("id"), userId),
					builder.equal(joinChatRoomUser2.get("id"), userId)	
				)
		);
		
		return entityManager.createQuery(query).getResultList();
	}

	
}
