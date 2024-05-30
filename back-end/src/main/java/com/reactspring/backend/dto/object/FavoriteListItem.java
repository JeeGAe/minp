package com.reactspring.backend.dto.object;

import java.util.ArrayList;
import java.util.List;

import com.reactspring.backend.repository.resultSet.GetFavoriteListResultSet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteListItem {
  
  private String email;
  private String nickname;

  public FavoriteListItem(GetFavoriteListResultSet resultSet) {
    this.email = resultSet.getEmail();
    this.nickname = resultSet.getNickname();
  }

  public static List<FavoriteListItem> getList(List<GetFavoriteListResultSet> resultSets) {
    List<FavoriteListItem> list = new ArrayList<>();
    for(GetFavoriteListResultSet resultSet : resultSets) {
      FavoriteListItem favoriteListItem = new FavoriteListItem(resultSet);
      list.add(favoriteListItem);
    }

    return list;
  }

}
