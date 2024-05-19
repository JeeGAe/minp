package com.reactspring.backend.service;

import org.springframework.http.ResponseEntity;

import com.reactspring.backend.dto.request.board.PatchBoardRequestDto;
import com.reactspring.backend.dto.request.board.PostBoardRequestDto;
import com.reactspring.backend.dto.response.board.DeleteBoardResponseDto;
import com.reactspring.backend.dto.response.board.GetBoardResponseDto;
import com.reactspring.backend.dto.response.board.GetUserBoardListResponseDto;
import com.reactspring.backend.dto.response.board.PatchBoardResponseDto;
import com.reactspring.backend.dto.response.board.PostBoardResponseDto;

public interface BoardService {

  ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email);
  ResponseEntity<? super GetBoardResponseDto> getBoard(int boardNumber);
  
  ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);

  ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber, String email);

  ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email);

}
