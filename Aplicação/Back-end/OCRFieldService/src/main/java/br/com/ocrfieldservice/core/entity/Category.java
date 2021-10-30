package br.com.ocrfieldservice.core.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="CATEGORY")
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 50, name = "name", nullable = false, unique = false)
	private String name;
	
	@Column(length = 150, name = "description", nullable = false, unique = false)
	private String description;
	
	@Column(name="active", nullable = false, columnDefinition = "tinyint default 1")
	private boolean active;
	
	@Column(name="automaticAssignment", nullable = false, columnDefinition = "tinyint default 1")
	private boolean automaticAssignment;
	
	@ElementCollection
	@OneToMany(cascade = CascadeType.PERSIST, targetEntity = Skill.class)
	private List<Skill> skills;
	
	@ElementCollection
	@OneToMany(cascade = CascadeType.PERSIST, targetEntity = Capacity.class)
	private List<Capacity> capacities;
	
	@ManyToOne(cascade = CascadeType.PERSIST, targetEntity = SLA.class)
	private SLA sla;
	
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

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isAutomaticAssignment() {
		return automaticAssignment;
	}

	public void setAutomaticAssignment(boolean automaticAssignment) {
		this.automaticAssignment = automaticAssignment;
	}

	public List<Skill> getSkills() {
		return skills;
	}

	public void setSkills(List<Skill> skills) {
		this.skills = skills;
	}

	public List<Capacity> getCapacities() {
		return capacities;
	}

	public void setCapacities(List<Capacity> capacities) {
		this.capacities = capacities;
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

	public SLA getSla() {
		return sla;
	}

	public void setSla(SLA sla) {
		this.sla = sla;
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}
}
