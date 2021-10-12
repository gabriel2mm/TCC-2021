package br.com.ocrfieldservice.dataprovider.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ocrfieldservice.core.entity.Skill;

public interface SkillDao extends JpaRepository<Skill, Long> {

}
