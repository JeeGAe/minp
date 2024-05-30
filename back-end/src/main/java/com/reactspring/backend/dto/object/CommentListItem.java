package com.reactspring.backend.dto.object;

import java.util.ArrayList;
import java.util.List;

import com.reactspring.backend.repository.resultSet.GetCommentListResultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentListItem {
  
  private String nickname;
  private String content;
  private String writeTime;

  public CommentListItem(GetCommentListResultSet resultSet) {
    this.nickname = resultSet.getNickname();
    this.content = resultSet.getContent();
    this.writeTime = resultSet.getWriteTime();
  }

  public static List<CommentListItem> getList(List<GetCommentListResultSet> resultSets) {
    List<CommentListItem> list = new ArrayList<>();
    for(GetCommentListResultSet resultSet : resultSets) {
      CommentListItem commentListItem = new CommentListItem(resultSet);
      list.add(commentListItem);
    }

    return list;
  }

}
