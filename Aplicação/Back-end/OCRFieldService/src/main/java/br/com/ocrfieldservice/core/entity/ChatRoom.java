package br.com.ocrfieldservice.core.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="CHATROOM")
public class ChatRoom {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne(cascade = CascadeType.MERGE, targetEntity = User.class)
	private User user1;
	
	@OneToOne(cascade = CascadeType.MERGE, targetEntity = User.class)
	private User user2;
	
	@Column(name = "notificiation", columnDefinition = "tinyint(1) default 0")
	private boolean notificiation;
	
	@JsonIgnore
	@CreationTimestamp
	private LocalDateTime created;
	
	@JsonIgnore
	@ElementCollection
	@OneToMany(cascade = CascadeType.REMOVE, targetEntity = Messages.class, fetch = FetchType.EAGER)
	private List<Messages> messages;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser1() {
		return user1;
	}

	public void setUser1(User user1) {
		this.user1 = user1;
	}

	public User getUser2() {
		return user2;
	}

	public void setUser2(User user2) {
		this.user2 = user2;
	}

	public boolean isNotificiation() {
		return notificiation;
	}

	public void setNotificiation(boolean notificiation) {
		this.notificiation = notificiation;
	}

	public LocalDateTime getCreated() {
		return created;
	}

	public void setCreated(LocalDateTime created) {
		this.created = created;
	}

	public List<Messages> getMessages() {
		return messages;
	}

	public void setMessages(List<Messages> messages) {
		this.messages = messages;
	}
	
}
