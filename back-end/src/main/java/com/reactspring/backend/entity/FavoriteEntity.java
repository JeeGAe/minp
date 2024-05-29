package com.reactspring.backend.entity;

import com.reactspring.backend.entity.primarykey.FavoritePK;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="favorite")
@Entity(name="favorite")
@IdClass(FavoritePK.class)
public class FavoriteEntity {
  
  @Id
  private String userEmmail;
  @Id
  private int boardNumber;

}
