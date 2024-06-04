package com.reactspring.backend.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.reactspring.backend.common.ResponseCode;
import com.reactspring.backend.common.ResponseMessage;
import com.reactspring.backend.dto.object.BoardListItem;
import com.reactspring.backend.dto.response.ResponseDto;
import com.reactspring.backend.entity.BoardListViewEntity;

import lombok.Getter;

@Getter
public class GetLatest3BoardResponseDto extends ResponseDto {
  
  private List<BoardListItem> boardList;

  public GetLatest3BoardResponseDto(List<BoardListViewEntity> boardListViewEntities) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.boardList = BoardListItem.getList(boardListViewEntities);
  }

  public static ResponseEntity<GetLatest3BoardResponseDto> success(List<BoardListViewEntity> boardListViewEntities) {
    GetLatest3BoardResponseDto result = new GetLatest3BoardResponseDto(boardListViewEntities);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
  
}
