package br.com.ocrfieldservice.core.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name = "USERS")
public class User implements UserDetails{

	private static final long serialVersionUID = -5483228932826755787L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ID;

	@Column(name = "firstName", nullable = false, length = 50)
	private String firstName;

	@Column(name = "lastName", nullable = false, length = 50)
	private String lastName;

	@Column(name = "email", nullable = false, length = 50, unique = true)
	private String email;

	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(name = "password_hash", nullable = false)
	private String password;

	@OneToOne(cascade = CascadeType.PERSIST, targetEntity = Organization.class)
	private Organization organization;

	@Column(name = "active", columnDefinition = "tinyint(1) default 1")
	private boolean active;

	@JsonIgnore
	@CreationTimestamp
	private LocalDateTime created;

	@JsonIgnore
	@UpdateTimestamp
	private LocalDateTime updated;
	
	@JsonIgnore
	@OneToOne(cascade = CascadeType.PERSIST, targetEntity = User.class)
	private User createdBy;
	
	@OneToMany(cascade = CascadeType.PERSIST, targetEntity = Activity.class)
	private List<Activity> activities;
	
	
	public List<Activity> getActivities() {
		return activities;
	}

	public void setActivities(List<Activity> activities) {
		this.activities = activities;
	}

	@OneToMany(cascade = CascadeType.REMOVE, targetEntity = PasswordReset.class)
	private Collection<PasswordReset> passwordResetList;

	public User() {
	}

	public User(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
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

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new ArrayList<>();
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public Collection<PasswordReset> getPasswordResetList() {
		return passwordResetList;
	}

	public void setPasswordResetList(Collection<PasswordReset> passwordResetList) {
		this.passwordResetList = passwordResetList;
	}
}
