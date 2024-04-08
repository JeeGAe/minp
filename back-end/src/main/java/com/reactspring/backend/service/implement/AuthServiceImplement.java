package com.reactspring.backend.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.reactspring.backend.dto.request.auth.SignUpRequestDto;
import com.reactspring.backend.dto.response.ResponseDto;
import com.reactspring.backend.dto.response.auth.SignUpResponseDto;
import com.reactspring.backend.entity.UserEntity;
import com.reactspring.backend.repository.UserRepository;
import com.reactspring.backend.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

  private final UserRepository userRepository;

  private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  @Override
  public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

    try {

      // 중복된 정보 처리
      String email = dto.getEmail();
      boolean existedEmail = userRepository.existsByEmail(email);
      if(existedEmail) return SignUpResponseDto.duplicateEmail();

      String nickname = dto.getNickname();
      boolean existedNickname = userRepository.existsByNickname(nickname);
      if(existedNickname) return SignUpResponseDto.duplicateNickname();

      String phoneNumber = dto.getPhoneNumber();
      boolean existedPhoneNumber = userRepository.existsByPhoneNumber(phoneNumber);
      if(existedPhoneNumber) return SignUpResponseDto.duplicatePhoneNumber();

      String password = dto.getPassword();
      String encodedPassword = passwordEncoder.encode(password);
      dto.setPassword(encodedPassword);

      UserEntity userEntity = new UserEntity(dto);
      userRepository.save(userEntity);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.internalError();
    }

    return SignUpResponseDto.success();
  }
}
