package com.reactspring.backend.entity;

import com.reactspring.backend.dto.request.board.PostCommentRequestDto;

import java.util.Date;
import java.time.Instant;
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
@NoArgsConstructor
@AllArgsConstructor
@Table(name="comment")
@Entity(name="comment")
public class CommentEntity {

  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
  private int commentNumber;
  private String content;
  private int boardNumber;
  private String userEmail;
  private String writeTime;

  public CommentEntity(PostCommentRequestDto dto, Integer boardNumber, String email) {

    Date now = Date.from(Instant.now());
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String writeTime = simpleDateFormat.format(now);

    this.content = dto.getContent();
    this.boardNumber = boardNumber;
    this.userEmail = email;
    this.writeTime = writeTime;
    
  }
  
}
