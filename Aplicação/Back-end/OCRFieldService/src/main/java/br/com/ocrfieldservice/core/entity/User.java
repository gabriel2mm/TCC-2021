package br.com.ocrfieldservice.core.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
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
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.ocrfieldservice.helpers.AuthoritiesDeserializer;

@Entity
@Table(name = "USERS")
public class User implements UserDetails {

	private static final long serialVersionUID = -5483228932826755787L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private long id;

	@Column(name = "firstName", nullable = false, length = 50)
	private String firstName;

	@Column(name = "lastName", nullable = false, length = 50)
	private String lastName;

	@Column(name = "email", nullable = false, length = 50, unique = true)
	private String email;

	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(name = "password_hash", nullable = false)
	private String password;

	@Column(name = "CPF", length = 14, nullable = false, unique = true)
	private String CPF;

	@ManyToOne(cascade = CascadeType.PERSIST, targetEntity = Organization.class)
	private Organization organization;

	@Column(name = "active", columnDefinition = "tinyint(1) default 1")
	private boolean active;

	@ManyToOne(cascade = CascadeType.PERSIST, targetEntity = Profile.class, fetch = FetchType.EAGER)
	private Profile profile;

	@ManyToMany(cascade = CascadeType.PERSIST, targetEntity = Skill.class)
	private Set<Skill> skills = new HashSet<>();

	@ManyToMany(targetEntity = Capacity.class, cascade = CascadeType.MERGE)
	private Set<Capacity> capacities = new HashSet<>();

	@ElementCollection
	@OneToMany(cascade = CascadeType.REMOVE, targetEntity = PasswordReset.class)
	private List<PasswordReset> passwordResetList;

	@ManyToMany(targetEntity = GroupUsers.class, cascade = CascadeType.MERGE)
	private Set<GroupUsers> groups = new HashSet<>();


	@JsonIgnore
	@CreationTimestamp
	private LocalDateTime created;

	@JsonIgnore
	@UpdateTimestamp
	private LocalDateTime updated;

	@JsonIgnore
	@OneToOne(cascade = CascadeType.PERSIST, targetEntity = User.class)
	private User createdBy;

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

	@Override
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

	@JsonDeserialize(using = AuthoritiesDeserializer.class)
	@Override
	public List<? extends GrantedAuthority> getAuthorities() {
		if (this.profile == null) {
			return new ArrayList<>();
		}

		return profile.getPermissions().stream().collect(Collectors.toList());
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

	public List<PasswordReset> getPasswordResetList() {
		return passwordResetList;
	}

	public void setPasswordResetList(List<PasswordReset> passwordResetList) {
		this.passwordResetList = passwordResetList;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}



	public String getCPF() {
		return CPF;
	}

	public void setCPF(String cPF) {
		CPF = cPF;
	}

	public Set<GroupUsers> getGroups() {
		return groups;
	}

	public void setGroups(Set<GroupUsers> groups) {
		this.groups = groups;
	}

	public Set<Capacity> getCapacities() {
		return capacities;
	}

	public void setCapacities(Set<Capacity> capacities) {
		this.capacities = capacities;
	}

	public Set<Skill> getSkills() {
		return skills;
	}

	public void setSkills(Set<Skill> skills) {
		this.skills = skills;
	}

}
