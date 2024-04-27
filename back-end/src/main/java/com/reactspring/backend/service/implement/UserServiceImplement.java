package com.reactspring.backend.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.reactspring.backend.dto.response.ResponseDto;
import com.reactspring.backend.dto.response.user.GetSignInUserResponseDto;
import com.reactspring.backend.entity.UserEntity;
import com.reactspring.backend.repository.UserRepository;
import com.reactspring.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

  private final UserRepository userRepository;

  @Override
  public ResponseEntity<? super GetSignInUserResponseDto> GetSignInUser(String email) {

    UserEntity userEntity = null;
    
    try {

      userEntity = userRepository.findByEmail(email);
      if(userEntity == null) return GetSignInUserResponseDto.notExistUser();
      
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.internalError();
    }

    return GetSignInUserResponseDto.success(userEntity);

  }

  
  
}
