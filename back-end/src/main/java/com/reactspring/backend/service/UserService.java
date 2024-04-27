package com.reactspring.backend.service;

import org.springframework.http.ResponseEntity;

import com.reactspring.backend.dto.response.user.GetSignInUserResponseDto;

public interface UserService {

  ResponseEntity<? super GetSignInUserResponseDto> GetSignInUser(String email);

}
