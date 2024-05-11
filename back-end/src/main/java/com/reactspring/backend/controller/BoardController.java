package com.reactspring.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reactspring.backend.dto.request.board.PostBoardRequestDto;
import com.reactspring.backend.dto.response.board.GetUserBoardListResponseDto;
import com.reactspring.backend.dto.response.board.PostBoardResponseDto;
import com.reactspring.backend.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

  private final BoardService boardService;

  @GetMapping("/all-user-board")
  public ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(@AuthenticationPrincipal String email) {
      
    ResponseEntity<? super GetUserBoardListResponseDto> response = boardService.getUserBoardList(email);
    return response;
  }
  

  @PostMapping("")
  public ResponseEntity<? super PostBoardResponseDto> postBoard(
    @RequestBody @Valid PostBoardRequestDto requestBody,
    @AuthenticationPrincipal String email) {
      
      ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(requestBody, email);
      return response;
  }
  
  
}
