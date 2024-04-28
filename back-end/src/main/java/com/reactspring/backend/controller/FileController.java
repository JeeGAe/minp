package com.reactspring.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.reactspring.backend.service.FileService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class FileController {

  private final FileService fileService;

  @PostMapping("/upload")
  public String upload(@RequestParam("file") MultipartFile file) {
    
    String url = fileService.uploadImage(file);
    return url;

  }

  @GetMapping(value="/board-image/{fileName}", produces={MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
  public Resource getBoardImage(@PathVariable("fileName") String fileName) {
    
    Resource resource = fileService.getBoardImage(fileName);
    return resource;

  }
  
  
  
}
