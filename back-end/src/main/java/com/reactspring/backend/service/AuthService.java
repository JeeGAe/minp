package com.reactspring.backend.service;

import org.springframework.http.ResponseEntity;

import com.reactspring.backend.dto.request.auth.SignUpRequestDto;
import com.reactspring.backend.dto.response.auth.SignUpResponseDto;

public interface AuthService {
  
  ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);

}
