package com.reactspring.backend.service;

import org.springframework.http.ResponseEntity;

import com.reactspring.backend.dto.request.board.PostBoardRequestDto;
import com.reactspring.backend.dto.response.board.GetUserBoardListResponseDto;
import com.reactspring.backend.dto.response.board.PostBoardResponseDto;

public interface BoardService {

  ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email);
  
  ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);

}
