package com.reactspring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.reactspring.backend.entity.CommentEntity;
import com.reactspring.backend.repository.resultSet.GetCommentListResultSet;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
  
  @Query(
    value=
    "SELECT " +
    "U.nickname AS nickname " +
    "C.content AS content " +
    "C.write_time + writeTime " +
    "FROM comment AS C " + 
    "INNER JOIN user AS U " + 
    "ON C.nickname = U.nickname " +
    "WHERE C.boardNumber = ?1" +
    "ORDER BY C.write_time DESC",
    nativeQuery=true
  )
  List<GetCommentListResultSet> getCommentList(Integer boardNumber);
}
