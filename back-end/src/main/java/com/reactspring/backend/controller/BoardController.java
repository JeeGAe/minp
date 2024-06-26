package com.reactspring.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reactspring.backend.dto.request.board.PatchBoardRequestDto;
import com.reactspring.backend.dto.request.board.PostBoardRequestDto;
import com.reactspring.backend.dto.request.board.PostCommentRequestDto;
import com.reactspring.backend.dto.response.board.DeleteBoardResponseDto;
import com.reactspring.backend.dto.response.board.GetBoardResponseDto;
import com.reactspring.backend.dto.response.board.GetCommentListResponseDto;
import com.reactspring.backend.dto.response.board.GetFavoriteListResponseDto;
import com.reactspring.backend.dto.response.board.GetLatest3BoardResponseDto;
import com.reactspring.backend.dto.response.board.GetUserBoardListResponseDto;
import com.reactspring.backend.dto.response.board.PatchBoardResponseDto;
import com.reactspring.backend.dto.response.board.PostBoardResponseDto;
import com.reactspring.backend.dto.response.board.PostCommentResponseDto;
import com.reactspring.backend.dto.response.board.PutFavoriteResponseDto;
import com.reactspring.backend.entity.BoardEntity;
import com.reactspring.backend.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;





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

  @GetMapping("/{boardNumber}")
  public ResponseEntity<? super GetBoardResponseDto> getBoard(
    @PathVariable("boardNumber") Integer boardNumber) {
      
      ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(boardNumber);
      return response;
  }
  

  @GetMapping("/{boardNumber}/favorite")
  public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(
    @PathVariable("boardNumber") Integer boardNumber) {
      
      ResponseEntity<? super GetFavoriteListResponseDto> response = boardService.getFavoriteList(boardNumber);
      return response;
  }
  
  @GetMapping("/{boardNumber}/comment")
  public ResponseEntity<? super GetCommentListResponseDto> getCommentList(
    @PathVariable("boardNumber") Integer boardNumber) {
      
      ResponseEntity<? super GetCommentListResponseDto> response = boardService.getCommentList(boardNumber);
      return response;
  }

  @GetMapping("/latest-3-board")
  public ResponseEntity<? super GetLatest3BoardResponseDto> getLatest3Board() {
      ResponseEntity<? super GetLatest3BoardResponseDto> response = boardService.getLatest3Board();
      return response;
  }
  
  

  @PostMapping("")
  public ResponseEntity<? super PostBoardResponseDto> postBoard(
    @RequestBody @Valid PostBoardRequestDto requestBody,
    @AuthenticationPrincipal String email) {
      
      ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(requestBody, email);
      return response;
  }

  @PostMapping("/{boardNumber}/comment")
  public ResponseEntity<? super PostCommentResponseDto> postComment(
    @RequestBody @Valid PostCommentRequestDto requestBody,
    @PathVariable("boardNumber") Integer boardNumber,
    @AuthenticationPrincipal String email
  ) {

    ResponseEntity<? super PostCommentResponseDto> response = boardService.postComment(requestBody, boardNumber, email);
    return response;
  }
  
  @PutMapping("/{boardNumber}/favorite")
  public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(
    @PathVariable("boardNumber") Integer boardNumber,
    @AuthenticationPrincipal String email) {

      ResponseEntity<? super PutFavoriteResponseDto> response = boardService.putFavorite(boardNumber, email);
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
