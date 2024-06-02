package com.reactspring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.reactspring.backend.entity.FavoriteEntity;
import com.reactspring.backend.entity.primarykey.FavoritePK;
import com.reactspring.backend.repository.resultSet.GetFavoriteListResultSet;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePK> {
  
  FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String userEmail);


  @Query(
    value=
    "SELECT " +
    "U.email AS email, " +
    "U.nickname AS nickname " +
    "FROM favorite AS F " +
    "INNER JOIN user AS U " +
    "ON F.user_email = U.email " +
    "WHERE F.board_number = ?1",
    nativeQuery=true
  )
  List<GetFavoriteListResultSet> getFavoriteList(Integer boardNumber);
  
}
