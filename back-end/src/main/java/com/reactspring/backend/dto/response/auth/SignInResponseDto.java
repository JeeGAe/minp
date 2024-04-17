package com.reactspring.backend.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.reactspring.backend.common.ResponseCode;
import com.reactspring.backend.common.ResponseMessage;
import com.reactspring.backend.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class SignInResponseDto extends ResponseDto{
  
  private String token;

  private SignInResponseDto(String token) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.token = token;
  }

  public static ResponseEntity<SignInResponseDto> success(String token) {
    SignInResponseDto result = new SignInResponseDto(token);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  public static ResponseEntity<ResponseDto> signInFail() {
    ResponseDto result = new ResponseDto(ResponseCode.SIGN_IN_FAILED, ResponseMessage.SIGN_IN_FAILED);
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
  }

}
