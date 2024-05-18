package com.reactspring.backend.dto.object;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.reactspring.backend.entity.BoardListViewEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardListItem {

  private int boardNumber;
  private String title;
  private String content;
  private String writerEmail;
  private String writerNickname;
  private String writeTime;
  private String recentModifyTime;
  private int viewCount;
  private int favoriteCount;
  private int commentCount;
  private List<String> boardImageList;

  public BoardListItem(BoardListViewEntity boardListViewEntity) {

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
    this.writerEmail = boardListViewEntity.getWriterEmail();
    this.writeTime = boardListViewEntity.getWriteTime();
    this.writerNickname = boardListViewEntity.getWriterNickname();
    this.recentModifyTime = boardListViewEntity.getRecentModifyTime();
    this.viewCount = boardListViewEntity.getViewCount();
    this.favoriteCount = boardListViewEntity.getFavoriteCount();
    this.commentCount = boardListViewEntity.getCommentCount();
    this.boardImageList = boardImageList;
  }

  public static List<BoardListItem> getList(List<BoardListViewEntity> boardListViewEntities) {
    
    List<BoardListItem> list = new ArrayList<>();
    for (BoardListViewEntity boardListViewEntity : boardListViewEntities) {
      BoardListItem boardListItem = new BoardListItem(boardListViewEntity);
      list.add(boardListItem);
    }

    return list;
  }

}
