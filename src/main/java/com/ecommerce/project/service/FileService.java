package com.ecommerce.project.service;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

// import java.io.File;
// import java.nio.file.Files;
// import java.nio.file.Paths;
// import java.util.UUID;

public interface FileService {
  String uploadImage(String path, MultipartFile file) throws IOException;
}
