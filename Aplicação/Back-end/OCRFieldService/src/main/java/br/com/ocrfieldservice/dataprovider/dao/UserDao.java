package br.com.ocrfieldservice.dataprovider.dao;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ocrfieldservice.dataprovider.entity.User;

public interface UserDao extends JpaRepository<User, UUID> {

}
