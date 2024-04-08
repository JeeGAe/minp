package com.reactspring.backend.entity;

import com.reactspring.backend.dto.request.auth.SignUpRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="user")
@Table(name="user")
public class UserEntity {
  
  @Id
  private String email;
  private String password;
  private String nickname;
  private String phoneNumber;
  private String zipCode;
  private String address;
  private String addressDetail;
  private String profileImage;

  public UserEntity(SignUpRequestDto dto) {

    this.email = dto.getEmail();
    this.password = dto.getPassword();
    this.nickname = dto.getNickname();
    this.phoneNumber = dto.getPhoneNumber();
    this.zipCode = dto.getZipCode();
    this.address = dto.getAddress();
    this.addressDetail = dto.getAddressDetail();

  }

}
