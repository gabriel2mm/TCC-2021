package br.com.ocrfieldservice.core.entity;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.ocrfieldservice.core.enumerators.ComplementStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="COMPLEMENT")
public class Complement {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column
	private String attchment;
	
	@Column
	private String complement;
	
	@Column
	private boolean visibleUser;
	
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

	public String getAttchment() {
		return attchment;
	}

	public void setAttchment(String attchment) {
		this.attchment = attchment;
	}

	public String getComplement() {
		return complement;
	}

	public void setComplement(String complement) {
		this.complement = complement;
	}

	public boolean isVisibleUser() {
		return visibleUser;
	}

	public void setVisibleUser(boolean visibleUser) {
		this.visibleUser = visibleUser;
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
}
