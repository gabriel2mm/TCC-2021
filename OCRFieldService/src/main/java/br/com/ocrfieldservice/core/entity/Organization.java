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
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="ORGS")
public class Organization {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name="name", unique=true, nullable = false)
	private String name;
	
	@Column(name="limitLicenses", length = 4, nullable = false)
	private int limitLicenses;
	
	@JsonIgnore
	@ElementCollection
	@OneToMany(cascade = CascadeType.REMOVE, targetEntity = User.class)
	private List<User> users;
	
	@JsonIgnore
	@ElementCollection
	@OneToMany(cascade = CascadeType.REMOVE, targetEntity = Organization.class)
	private List<Profile> profiles;

	
	@JsonIgnore
	@ElementCollection
	@OneToMany(cascade = CascadeType.REMOVE, targetEntity = GroupUsers.class)
	private List<GroupUsers> groups;
	
	@JsonIgnore
	@ElementCollection
	@OneToMany(cascade = CascadeType.REMOVE, targetEntity = Capacity.class)
	private List<Capacity> capacities;
	
	@JsonIgnore
	@ElementCollection
	@OneToMany(cascade = CascadeType.REMOVE, targetEntity = Skill.class)
	private List<Capacity> skills;
	
	@JsonIgnore
	@ElementCollection
	@OneToMany(cascade = CascadeType.REMOVE, targetEntity = SLA.class)
	private List<SLA> slas;
	
	@JsonIgnore
	@ElementCollection
	@OneToMany(cascade = CascadeType.REMOVE, targetEntity = Category.class)
	private List<Category> categories;
	
	@JsonIgnore
	@CreationTimestamp
	private LocalDateTime created;
	
	@JsonIgnore
	@UpdateTimestamp
	private LocalDateTime updated;
	
	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL, targetEntity = User.class, fetch = FetchType.LAZY)
	private User createdBy;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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


	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public List<Profile> getProfiles() {
		return profiles;
	}

	public void setProfiles(List<Profile> profiles) {
		this.profiles = profiles;
	}

	public List<GroupUsers> getGroups() {
		return groups;
	}

	public void setGroups(List<GroupUsers> groups) {
		this.groups = groups;
	}

	public List<Capacity> getCapacities() {
		return capacities;
	}

	public void setCapacities(List<Capacity> capacities) {
		this.capacities = capacities;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public List<Capacity> getSkills() {
		return skills;
	}

	public void setSkills(List<Capacity> skills) {
		this.skills = skills;
	}

	public List<SLA> getSlas() {
		return slas;
	}

	public void setSlas(List<SLA> slas) {
		this.slas = slas;
	}

	public int getLimitLicenses() {
		return limitLicenses;
	}

	public void setLimitLicenses(int limitLicenses) {
		this.limitLicenses = limitLicenses;
	}
	
}
