package com.reactspring.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reactspring.backend.entity.ImageEntity;
import java.util.List;


@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {
  
  List<ImageEntity> findByBoardNumber(Integer boardNumber);

  void deleteByBoardNumber(int boardNumber);

}
