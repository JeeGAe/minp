package com.reactspring.backend.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

import com.reactspring.backend.dto.request.board.PatchBoardRequestDto;
import com.reactspring.backend.dto.request.board.PostBoardRequestDto;
import com.reactspring.backend.dto.request.board.PostCommentRequestDto;
import com.reactspring.backend.dto.response.ResponseDto;
import com.reactspring.backend.dto.response.board.DeleteBoardResponseDto;
import com.reactspring.backend.dto.response.board.GetBoardResponseDto;
import com.reactspring.backend.dto.response.board.GetCommentListResponseDto;
import com.reactspring.backend.dto.response.board.GetFavoriteListResponseDto;
import com.reactspring.backend.dto.response.board.GetUserBoardListResponseDto;
import com.reactspring.backend.dto.response.board.PatchBoardResponseDto;
import com.reactspring.backend.dto.response.board.PostBoardResponseDto;
import com.reactspring.backend.dto.response.board.PostCommentResponseDto;
import com.reactspring.backend.dto.response.board.PutFavoriteResponseDto;
import com.reactspring.backend.entity.BoardEntity;
import com.reactspring.backend.entity.BoardListViewEntity;
import com.reactspring.backend.entity.CommentEntity;
import com.reactspring.backend.entity.FavoriteEntity;
import com.reactspring.backend.entity.ImageEntity;
import com.reactspring.backend.repository.BoardListViewRepository;
import com.reactspring.backend.repository.BoardRepository;
import com.reactspring.backend.repository.CommentRepository;
import com.reactspring.backend.repository.FavoriteRepository;
import com.reactspring.backend.repository.ImageRepository;
import com.reactspring.backend.repository.UserRepository;
import com.reactspring.backend.repository.resultSet.GetBoardResultSet;
import com.reactspring.backend.repository.resultSet.GetCommentListResultSet;
import com.reactspring.backend.repository.resultSet.GetFavoriteListResultSet;
import com.reactspring.backend.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {

  private final UserRepository userRepository;
  private final BoardRepository boardRepository;
  private final ImageRepository imageRepository;
  private final BoardListViewRepository boardListViewRepository;
  private final CommentRepository commentRepository;
  private final FavoriteRepository favoriteRepository;

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
  public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

    GetBoardResultSet resultSet = null;
    List<ImageEntity> imageEntities = new ArrayList<>();
    
    try {
      
      resultSet = boardRepository.getBoard(boardNumber);
      if(resultSet == null) return GetBoardResponseDto.noExistBoard();

      imageEntities = imageRepository.findByBoardNumber(boardNumber);

      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      boardEntity.increaseViewCount();
      boardRepository.save(boardEntity);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.internalError();
    }

    return GetBoardResponseDto.success(resultSet, imageEntities);

  }

  @Override
  public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber) {

    List<GetFavoriteListResultSet> resultSets = new ArrayList<>();

    try {

      boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
      if(!existedBoard) return GetFavoriteListResponseDto.noExistBoard();

      resultSets = favoriteRepository.getFavoriteList(boardNumber);
      
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.internalError();
    }

    return GetFavoriteListResponseDto.success(resultSets);
  }

  @Override
  public ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber) {

    List<GetCommentListResultSet> resultSets = new ArrayList<>();

    try {
      
      boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
      if(!existedBoard) return GetCommentListResponseDto.noExistBoard();

      resultSets = commentRepository.getCommentList(boardNumber);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.internalError();
    }

    return GetCommentListResponseDto.success(resultSets);
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

  @Override
  public ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email) {

    try {

      boolean existedEmail = userRepository.existsByEmail(email);
      if(!existedEmail) return PostCommentResponseDto.noExistUser();

      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      if(boardEntity == null) return PostCommentResponseDto.noExistBoard();

      CommentEntity commentEntity = new CommentEntity(dto, boardNumber, email);
      commentRepository.save(commentEntity);

      boardEntity.increaseCommentCount();
      boardRepository.save(boardEntity);
      
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.internalError();
    }

    return PostCommentResponseDto.success(); 

  }

  @Override
  public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) {

    try {

      boolean existedEmail = userRepository.existsByEmail(email);
      if(!existedEmail) return PutFavoriteResponseDto.noExistUser();

      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      if(boardEntity == null) return PutFavoriteResponseDto.noExistBoard();

      FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
      if(favoriteEntity == null) {
        favoriteEntity = new FavoriteEntity(email, boardNumber);
        favoriteRepository.save(favoriteEntity);
        boardEntity.increaseFavoriteCount();
      } else {
        favoriteRepository.delete(favoriteEntity);
        boardEntity.decreaseFavoriteCount();
      }

      boardRepository.save(boardEntity);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.internalError();
    }

    return PutFavoriteResponseDto.success();
  }


  @Override
  public ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber,
      String email) {

        try {

          boolean existedUser = userRepository.existsByEmail(email);
          if(!existedUser) return PatchBoardResponseDto.noExistUser();

          BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
          if(boardEntity == null) return PatchBoardResponseDto.noExistBoard();

          String writerEmail = boardEntity.getWriterEmail();
          boolean isWriter = writerEmail.equals(email);
          if(!isWriter) return PatchBoardResponseDto.noPermisson();

          boardEntity.patchBoard(dto);
          boardRepository.save(boardEntity);

          List<String> boardImageList = dto.getBoardImageList();
          
          imageRepository.deleteByBoardNumber(boardNumber);
          List<ImageEntity> imageEntities = new ArrayList<>();

          for(String image : boardImageList) {
            ImageEntity imageEntity = new ImageEntity(boardNumber, image);
            imageEntities.add(imageEntity);
          }

          imageRepository.saveAll(imageEntities);

        } catch (Exception e) {
          e.printStackTrace();
          return ResponseDto.internalError();
        }

        return PatchBoardResponseDto.success();
  }

  @Override
  public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email) {
    
    try {

      boolean existedEmail = userRepository.existsByEmail(email);
      if(!existedEmail) return DeleteBoardResponseDto.noExistUser();

      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      if(boardEntity == null) return DeleteBoardResponseDto.noExistBoard();

      String writerEmail = boardEntity.getWriterEmail();
      boolean isWriter = writerEmail.equals(email);
      if(!isWriter) return DeleteBoardResponseDto.noPermission();

      imageRepository.deleteByBoardNumber(boardNumber);
      boardRepository.delete(boardEntity);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.internalError();
    }

    return DeleteBoardResponseDto.success();
  }


}
