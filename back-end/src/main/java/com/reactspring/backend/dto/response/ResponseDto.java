package com.reactspring.backend.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.reactspring.backend.common.ResponseCode;
import com.reactspring.backend.common.ResponseMessage;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseDto {
  
  private String code;
  private String message;

  public static ResponseEntity<ResponseDto> internalError() {
    ResponseDto responseBody = new ResponseDto(ResponseCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_SERVER_ERROR);

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
  }

  public static ResponseEntity<ResponseDto> validationFailed() {
    ResponseDto responseBody = new ResponseDto(ResponseCode.VALIDATION_FAILED, ResponseMessage.VALIDATION_FAILED);

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
  }
}