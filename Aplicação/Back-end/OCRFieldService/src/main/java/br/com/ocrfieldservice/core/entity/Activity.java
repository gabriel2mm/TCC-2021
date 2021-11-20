package br.com.ocrfieldservice.core.entity;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.ocrfieldservice.core.enumerators.ActivityStatus;

@Entity
@DynamicInsert
@Table(name="ACTIVITY")
public class Activity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(unique = true, nullable = false, length = 50)
	private String number;
	
	@Column(nullable = false, length = 750)
	private String description;
	
	@Column(nullable = true)
	private String attachment;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateLimit;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateClosed;
	
	@ManyToOne(cascade = CascadeType.MERGE , targetEntity = Category.class)
	private Category category; 
	
	@OneToOne(cascade = CascadeType.MERGE, targetEntity = User.class )
	private User requester;
	
	@OneToOne(cascade = CascadeType.MERGE, targetEntity = User.class )
	private User assigned;
	
	@Column
	@Enumerated
	private ActivityStatus status;
	
	@OneToOne(cascade = CascadeType.ALL, targetEntity = Proof.class)
	private Proof proof;
	
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Complement.class)
	private Set<Complement> complements = new HashSet<Complement>();
	
	@ManyToOne(cascade = CascadeType.MERGE, targetEntity = Address.class)
	private Address address;
	
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Location.class)
	private Set<Location> locations = new HashSet<>();
	
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.MERGE, targetEntity = Organization.class)
	private Organization organization;
	
	@CreationTimestamp
	private Date created;

	@JsonIgnore
	@UpdateTimestamp
	private LocalDateTime updated;

	@OneToOne(cascade = CascadeType.PERSIST, targetEntity = User.class)
	private User createdBy;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAttachment() {
		return attachment;
	}

	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public User getRequester() {
		return requester;
	}

	public void setRequester(User requester) {
		this.requester = requester;
	}

	public User getAssigned() {
		return assigned;
	}

	public void setAssigned(User assigned) {
		this.assigned = assigned;
	}

	public ActivityStatus getStatus() {
		return status;
	}

	public void setStatus(ActivityStatus status) {
		this.status = status;
	}

	public Proof getProof() {
		return proof;
	}

	public void setProof(Proof proof) {
		this.proof = proof;
	}

	public Set<Complement> getComplements() {
		return complements;
	}

	public void setComplements(Set<Complement> complements) {
		this.complements = complements;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Set<Location> getLocations() {
		return locations;
	}

	public void setLocations(Set<Location> locations) {
		this.locations = locations;
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
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

	public Date getDateLimit() {
		return dateLimit;
	}

	public void setDateLimit(Date dateLimit) {
		this.dateLimit = dateLimit;
	}

	public Date getDateClosed() {
		return dateClosed;
	}

	public void setDateClosed(Date dateClosed) {
		this.dateClosed = dateClosed;
	}	
}
