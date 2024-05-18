package com.reactspring.backend.repository.resultSet;

public interface GetBoardResultSet {

  Integer getBoardNumber();
  String getTitle();
  String getContent();
  String getWriterEmail();
  String getWriterNickname();
  String getWriteTime();
  String getRecentModifyTime();

}
