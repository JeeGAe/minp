package com.reactspring.backend.service;

import org.springframework.http.ResponseEntity;

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

public interface BoardService {

  ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email);
  ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
  ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
  ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber);
  ResponseEntity<? super GetLatest3BoardResponseDto> getLatest3Board();
  
  ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
  ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email);

  ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);

  ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber, String email);

  ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email);

}
