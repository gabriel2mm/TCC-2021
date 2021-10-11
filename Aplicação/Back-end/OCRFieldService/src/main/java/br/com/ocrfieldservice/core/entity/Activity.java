package br.com.ocrfieldservice.core.entity;

import java.io.File;
import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="ACTIVITY")
public class Activity {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name="number")
	private String number;
	
	@JsonIgnore
    @CreationTimestamp
    private LocalDateTime created;

    @JsonIgnore
    @UpdateTimestamp
    private LocalDateTime updated;
	
	@OneToOne(cascade = CascadeType.PERSIST, targetEntity = User.class)
	private User createdBy;
	
    @OneToOne(cascade = CascadeType.PERSIST, targetEntity = User.class)
	private User requester;
	
	@OneToOne(cascade = CascadeType.PERSIST, targetEntity = User.class)
	private User assignedUser;
	
	public User getRequester() {
		return requester;
	}


	public void setRequester(User requester) {
		this.requester = requester;
	}


	public User getAssignedUser() {
		return assignedUser;
	}


	public void setAssignedUser(User assignedUser) {
		this.assignedUser = assignedUser;
	}


	public User getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	@Column(name="category")
	private String category;
	
	@Column(name="description")
	private String description;
	
	@Column(name="attachment")
	private File attachment;
	
	@Column(name="complement")
	private String complement;
	
	/*
	@ManyToOne
    @JoinColumn(name = "address_id", cascade = CascadeType.ALL, targetEntity = User.class)
    private Address address;
    */
	
	@Column(name="status")
	private String status;
	
	@Column(name="proof")
	private String proof;
	
	@Column(name="location")
	private String location;
	
	public Activity() {
	}
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public LocalDateTime getCreated() {
		return created;
	}


	public void setCreated(LocalDateTime created) {
		this.created = created;
	}


	public LocalDateTime getUpdated() {
		return updated;
	}


	public void setUpdated(LocalDateTime updated) {
		this.updated = updated;
	}


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public File getAttachment() {
		return attachment;
	}

	public void setAttachment(File attachment) {
		this.attachment = attachment;
	}

	public String getComplement() {
		return complement;
	}

	public void setComplement(String complement) {
		this.complement = complement;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getProof() {
		return proof;
	}

	public void setProof(String proof) {
		this.proof = proof;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
	
}
