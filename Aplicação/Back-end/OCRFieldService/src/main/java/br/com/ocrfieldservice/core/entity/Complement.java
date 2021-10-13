package br.com.ocrfieldservice.core.entity;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.ocrfieldservice.enums.ComplementType;

@Entity
@Table(name="COMPLEMENT")
public class Complement {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@JsonIgnore
    @CreationTimestamp
    private LocalDateTime created;

    @JsonIgnore
    @UpdateTimestamp
    private LocalDateTime updated;
	
	@OneToOne(cascade = CascadeType.PERSIST, targetEntity = User.class)
	private User createdBy;
	
	@Column(name="description")
	private String description;
	
	@Column(name="attachment")
	private File attachment;
	
	@Column(name="isVisibleCustumer")
	private Boolean isVisibleCustumer;
	
	@Column(name="complementType")
	@Enumerated(value = EnumType.STRING)
	private ComplementType complementType;
	
	/*@OneToOne(cascade = CascadeType.PERSIST, targetEntity = Activity.class)
	@JoinColumn(name="activity")
	private Activity activity;*/
	
	@OneToMany(cascade = CascadeType.PERSIST, targetEntity = Activity.class)
	private List<Activity> activities;
	
	
	public List<Activity> getActivities() {
		return activities;
	}


	public void setActivities(List<Activity> activities) {
		this.activities = activities;
	}


	public ComplementType getComplementType() {
		return complementType;
	}


	public void setComplementType(ComplementType complementType) {
		this.complementType = complementType;
	}


	public User getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}


	public File getAttachment() {
		return attachment;
	}


	public void setAttachment(File attachment) {
		this.attachment = attachment;
	}


	public Boolean getIsVisibleCustumer() {
		return isVisibleCustumer;
	}


	public void setIsVisibleCustumer(Boolean isVisibleCustumer) {
		this.isVisibleCustumer = isVisibleCustumer;
	}
	
	public Complement() {
	}
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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
	
}
