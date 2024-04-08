package com.reactspring.backend.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {
  
  @NotBlank @Email
  private String email;

  @NotBlank
  private String password;

  @NotBlank
  private String nickname;

  @NotBlank
  private String phoneNumber;

  private String zipCode;

  private String address;

  private String addressDetail;

}
