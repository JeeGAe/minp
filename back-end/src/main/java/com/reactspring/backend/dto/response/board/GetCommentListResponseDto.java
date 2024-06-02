package com.reactspring.backend.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.reactspring.backend.common.ResponseCode;
import com.reactspring.backend.common.ResponseMessage;
import com.reactspring.backend.dto.object.CommentListItem;
import com.reactspring.backend.dto.response.ResponseDto;
import com.reactspring.backend.repository.resultSet.GetCommentListResultSet;

import lombok.Getter;

@Getter
public class GetCommentListResponseDto extends ResponseDto {
  
  private List<CommentListItem> commentList;

  private GetCommentListResponseDto(List<GetCommentListResultSet> resultSets) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.commentList = CommentListItem.getList(resultSets);
  }

  public static ResponseEntity<GetCommentListResponseDto> success(List<GetCommentListResultSet> resultSets) {
    GetCommentListResponseDto result = new GetCommentListResponseDto(resultSets);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  public static ResponseEntity<ResponseDto> noExistBoard() {
    ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

}
