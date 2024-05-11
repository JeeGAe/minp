package com.reactspring.backend.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

import com.reactspring.backend.dto.request.board.PostBoardRequestDto;
import com.reactspring.backend.dto.response.ResponseDto;
import com.reactspring.backend.dto.response.board.GetUserBoardListResponseDto;
import com.reactspring.backend.dto.response.board.PostBoardResponseDto;
import com.reactspring.backend.entity.BoardEntity;
import com.reactspring.backend.entity.BoardListViewEntity;
import com.reactspring.backend.entity.ImageEntity;
import com.reactspring.backend.repository.BoardListViewRepository;
import com.reactspring.backend.repository.BoardRepository;
import com.reactspring.backend.repository.ImageRepository;
import com.reactspring.backend.repository.UserRepository;
import com.reactspring.backend.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {

  private final UserRepository userRepository;
  private final BoardRepository boardRepository;
  private final ImageRepository imageRepository;
  private final BoardListViewRepository boardListViewRepository;

  @Override
  public ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email) {

    List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

    try {

      boolean existedEmail = userRepository.existsByEmail(email);
      if(!existedEmail) return GetUserBoardListResponseDto.noExistUser();

      boardListViewEntities = boardListViewRepository.findByWriterEmailOrderByWriteTimeDesc(email);
      
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.internalError();
    }

    return GetUserBoardListResponseDto.success(boardListViewEntities);
    
  }

  @Override
  public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {

    try {

      Boolean existedEmail = userRepository.existsByEmail(email);
      if(!existedEmail) return PostBoardResponseDto.notExistUser();

      BoardEntity boardEntity = new BoardEntity(dto, email);
      boardRepository.save(boardEntity);

      int boardNumber = boardEntity.getBoardNumber();
      List<String> boardIamgeList = dto.getBoardImageList();
      List<ImageEntity> imageEntities = new ArrayList<>();

      for(String image : boardIamgeList) {
        ImageEntity imageEntity = new ImageEntity(boardNumber, image);
        imageEntities.add(imageEntity);
      }

      imageRepository.saveAll(imageEntities);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.internalError();
    }

    return PostBoardResponseDto.success();

  }
  
}
