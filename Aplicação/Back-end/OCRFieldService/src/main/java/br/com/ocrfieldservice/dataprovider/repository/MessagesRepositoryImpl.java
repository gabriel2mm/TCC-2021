package br.com.ocrfieldservice.dataprovider.repository;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.core.entity.ChatRoom;
import br.com.ocrfieldservice.core.entity.Messages;
import br.com.ocrfieldservice.core.entity.User;
import br.com.ocrfieldservice.core.repository.MessagesRepository;
import br.com.ocrfieldservice.dataprovider.dao.MessagesDao;

@Repository
public class MessagesRepositoryImpl implements MessagesRepository, Serializable {


	private static final long serialVersionUID = -122164147640234431L;

	@Autowired
	private EntityManager entityManager;

	@Autowired
	private MessagesDao dao;

	@Override
	public void save(Messages message) {
		dao.save(message);
	}

	@Override
	public List<Messages> findAll(ChatRoom chatRoom) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Messages> query = builder.createQuery(Messages.class);
		Root<Messages> root = query.from(Messages.class);

		query.orderBy(builder.desc(root.get("created")));

		query.distinct(true).select(root).where(
				builder.equal(root.get("chatRoom"), chatRoom)
		);

		return entityManager.createQuery(query).getResultList();
	}

	@Override
	public List<Messages> findAll(Long id) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Messages> query = builder.createQuery(Messages.class);
		Root<Messages> root = query.from(Messages.class);
		Join<Messages, ChatRoom> rootMessagesUser = root.join("chatRoom");

		query.distinct(true).select(root).where(
				builder.equal(rootMessagesUser.get("id"), id)
		);

		return entityManager.createQuery(query).setMaxResults(100).getResultList();

	}

	@Override
	public List<Messages> findAll(User user) {

		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Messages> query = builder.createQuery(Messages.class);
		Root<Messages> root = query.from(Messages.class);

		query.distinct(true).select(root).where(
				builder.or(
						builder.equal(root.get("to"), user),
						builder.equal(root.get("from"), user)
				)
		);

		return entityManager.createQuery(query).getResultList();
	}

}
