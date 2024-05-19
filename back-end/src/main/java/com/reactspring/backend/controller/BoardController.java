package com.reactspring.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reactspring.backend.dto.request.board.PatchBoardRequestDto;
import com.reactspring.backend.dto.request.board.PostBoardRequestDto;
import com.reactspring.backend.dto.response.board.DeleteBoardResponseDto;
import com.reactspring.backend.dto.response.board.GetUserBoardListResponseDto;
import com.reactspring.backend.dto.response.board.PatchBoardResponseDto;
import com.reactspring.backend.dto.response.board.PostBoardResponseDto;
import com.reactspring.backend.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;



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

  @PatchMapping("/{boardNumber}")
  public ResponseEntity<? super PatchBoardResponseDto> patchBoard(
    @RequestBody @Valid PatchBoardRequestDto requestBody,
    @PathVariable("boardNumber") Integer boardNumber,
    @AuthenticationPrincipal String email
  ) {

    ResponseEntity<? super PatchBoardResponseDto> response = boardService.patchBoard(requestBody, boardNumber, email);
    return response;
  }

  @DeleteMapping("/{boardNumber}")
  public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(
    @PathVariable("boardNumber") Integer boardNumber,
    @AuthenticationPrincipal String email
  ) {

    ResponseEntity<? super DeleteBoardResponseDto> response = boardService.deleteBoard(boardNumber, email);
    return response;
  }
  
}
