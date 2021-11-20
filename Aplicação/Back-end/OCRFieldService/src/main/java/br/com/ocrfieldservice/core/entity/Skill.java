package br.com.ocrfieldservice.core.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "SKILL")
public class Skill {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 50, name = "name", nullable = false, unique = false)
	private String name;

	@Column(length = 150, name = "description", nullable = false, unique = false)
	private String description;

	@Column(name="active", nullable = false, columnDefinition = "tinyint default 1")
	private boolean active;

	@ElementCollection
	@ManyToMany(cascade = CascadeType.PERSIST, targetEntity = User.class)
	private Set<User> users = new HashSet<>();

	@ManyToOne(cascade = CascadeType.PERSIST, targetEntity = Category.class)
	private Category category;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.PERSIST,targetEntity = Organization.class)
	private Organization organization;

	@JsonIgnore
	@CreationTimestamp
	private LocalDateTime created;

	@JsonIgnore
	@UpdateTimestamp
	private LocalDateTime updated;

	@JsonIgnore
	@OneToOne(cascade = CascadeType.PERSIST, targetEntity = User.class)
	private User createdBy;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}


}
