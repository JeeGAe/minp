package com.reactspring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reactspring.backend.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
  
  boolean existsByEmail(String email);

  boolean existsByNickname(String nickname);

  boolean existsByPhoneNumber(String phoneNumber);

  UserEntity findByEmail(String email);

}
