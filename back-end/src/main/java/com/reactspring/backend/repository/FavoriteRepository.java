package com.reactspring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reactspring.backend.entity.FavoriteEntity;
import com.reactspring.backend.entity.primarykey.FavoritePK;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePK> {
  
  FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String userEmail);
  
}
