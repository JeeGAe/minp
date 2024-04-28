package com.reactspring.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="board")
@Table(name="board")
public class BoardEntity {

  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
  private int boardNumber;
  private String title;
  private String writerEmail;
  private String WriteTime;
  private String recentModifyTime;
  private int viewCount;
  private int favoriteCount;
  private int commentCount;

}
