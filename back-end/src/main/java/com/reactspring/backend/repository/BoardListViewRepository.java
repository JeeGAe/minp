package com.reactspring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reactspring.backend.entity.BoardListViewEntity;

@Repository
public interface BoardListViewRepository extends JpaRepository<BoardListViewEntity, Integer> {

  BoardListViewEntity findByBoardNumber(Integer boardNumber);

  List<BoardListViewEntity> findByWriterEmailOrderByWriteTimeDesc(String writerEmail);

  List<BoardListViewEntity> findTop3ByOrderByWriteTimeDesc();
  
}
