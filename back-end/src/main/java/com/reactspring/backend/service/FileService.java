package com.reactspring.backend.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
  
  String uploadImage(MultipartFile file);
  Resource getBoardImage(String fileName);

}
