package com.reactspring.backend.dto.response.board;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.reactspring.backend.common.ResponseCode;
import com.reactspring.backend.common.ResponseMessage;
import com.reactspring.backend.dto.object.BoardListItem;
import com.reactspring.backend.dto.response.ResponseDto;
import com.reactspring.backend.entity.BoardListViewEntity;
import com.reactspring.backend.entity.ImageEntity;
import com.reactspring.backend.repository.resultSet.GetBoardResultSet;

import lombok.Getter;

@Getter
public class GetBoardResponseDto extends ResponseDto {
  
  private int boardNumber;
  private String title;
  private String content;
  private String writeTime;
  private String recentModifyTime;
  private int viewCount;
  private int favoriteCount;
  private int commentCount;
  private String writerEmail;
  private String writerNickname;
  private List<String> boardImageList;

  // private GetBoardResponseDto(GetBoardResultSet resultSet, List<ImageEntity> imageEntities) {

  //   super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

  //   List<String> imageList = new ArrayList<>();

  //   for(ImageEntity imageEntity : imageEntities) {
  //     String image = imageEntity.getImage();
  //     imageList.add(image);
  //   }

  //   this.boardNumber = resultSet.getBoardNumber();
  //   this.title = resultSet.getTitle();
  //   this.content = resultSet.getContent();
  //   this.writerEmail = getWriterEmail();
  //   this.writerNickname = getWriterNickname();
  //   this.writeTime = getWriteTime();
  //   this.recentModifyTime = getRecentModifyTime();
  //   this.imageList = imageList;

  // }

  // public static ResponseEntity<GetBoardResponseDto> success(GetBoardResultSet resultSet, List<ImageEntity> imageEntities) {
  //   GetBoardResponseDto result = new GetBoardResponseDto(resultSet, imageEntities);
  //   return ResponseEntity.status(HttpStatus.OK).body(result);
  // }

  private GetBoardResponseDto(BoardListViewEntity boardListViewEntity) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

    String boardImageListString = boardListViewEntity.getBoardImageList();
    List<String> boardImageList;

    if(boardImageListString == null) {
      boardImageList = new ArrayList<>();
    } else {
      boardImageList = Arrays.asList(boardImageListString.split(","));
    }

    this.boardNumber = boardListViewEntity.getBoardNumber();
    this.title = boardListViewEntity.getTitle();
    this.content = boardListViewEntity.getContent();
    this.writeTime = boardListViewEntity.getWriteTime();
    this.recentModifyTime = boardListViewEntity.getRecentModifyTime();
    this.viewCount = boardListViewEntity.getViewCount();
    this.favoriteCount = boardListViewEntity.getFavoriteCount();
    this.commentCount = boardListViewEntity.getCommentCount();
    this.writerEmail = boardListViewEntity.getWriterEmail();
    this.writerNickname = boardListViewEntity.getWriterNickname();
    this.boardImageList = boardImageList;
  }

  public static ResponseEntity<GetBoardResponseDto> success(BoardListViewEntity boardListViewEntity) {
    GetBoardResponseDto result = new GetBoardResponseDto(boardListViewEntity);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  public static ResponseEntity<ResponseDto> noExistBoard() {
    ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

}
