package com.reactspring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.reactspring.backend.entity.BoardEntity;
import com.reactspring.backend.repository.resultSet.GetBoardResultSet;
import java.util.List;


@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
  
  @Query(
    value=
    "SELECT " +
    "B.board_number boardNumber, " +
    "B.title title, " +
    "B.content content, " + 
    "U.email writerEmail, " + 
    "U.nickname writerNickname, " + 
    "B.write_time writeTime, " + 
    "B.recent_modify_time recentModifyTime, " +
    "FROM board B " + 
    "INNER JOIN user U " +
    "ON B.writer_email = U.email " +
    "WHERE board_number = ?1 ",
    nativeQuery=true
  )
  GetBoardResultSet getBoard(Integer boardNumber);

  BoardEntity findByBoardNumber(Integer boardNumber);

  boolean existsByBoardNumber(Integer boardNumber);
  
}
