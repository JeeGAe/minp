package com.reactspring.backend.entity;

import com.reactspring.backend.dto.request.board.PostBoardRequestDto;

import java.time.Instant;
import java.util.Date;
import java.text.SimpleDateFormat;

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
  private String content;
  private String writerEmail;
  private String writeTime;
  private String recentModifyTime;
  private int viewCount;
  private int favoriteCount;
  private int commentCount;

  public BoardEntity(PostBoardRequestDto dto, String email) {

    Date now = Date.from(Instant.now());
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String writeTime = simpleDateFormat.format(now);

    this.title = dto.getTitle();
    this.content = dto.getContent();
    this.writerEmail = email;
    this.writeTime = writeTime;
    this.recentModifyTime = writeTime;
    this.viewCount = 0;
    this.favoriteCount = 0;
    this.commentCount = 0;

  }

}
