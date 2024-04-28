package com.reactspring.backend.service.implement;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.reactspring.backend.service.FileService;

@Service
public class FileServiceImplement implements FileService {

  @Value("${file.path}")
  String filePath;
  @Value("${file.url}")
  String fileUrl;

  @Override
  public String uploadImage(MultipartFile file) {

    if(file.isEmpty()) return null;

    String originalFileName = file.getOriginalFilename();
    String extension = originalFileName.substring(originalFileName.indexOf("."));
    String uuid = UUID.randomUUID().toString();
    String uuidFileName = uuid + extension;
    String savePath = filePath + "board_images/" + uuidFileName;

    try {
      file.transferTo(new File(savePath));
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }

    String url = fileUrl + "board-image/" + uuidFileName;
    return url;

  }

  @Override
  public Resource getBoardImage(String fileName) {

    Resource resource = null;

    try {

      resource = new UrlResource("file:" + filePath + "board_images/" + fileName);
      
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }

    return resource;

  }
  
}
