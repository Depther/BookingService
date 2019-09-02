package me.depther.controller;

import me.depther.exception.FileDownloadException;
import me.depther.model.ImageFile;
import me.depther.service.DownloadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;

@RestController
@RequestMapping("/api/download")
public class DownloadController {

	@Autowired
	private DownloadService downloadService;

	@GetMapping("/image/{fileId}")
	public void donwloadImageHandler(@PathVariable("fileId") int fileId, HttpServletResponse response) throws Exception {
		ImageFile imageFile = downloadService.downloadImage(fileId);
		response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(imageFile.getFileName(), "utf-8") + ";");
		try (InputStream inputStream = new FileInputStream(imageFile.getSaveFileName());
			 OutputStream outputStream = response.getOutputStream()) {
			int readCount = 0;
			byte[] buffer = new byte[1024];
			while ((readCount = inputStream.read(buffer)) != -1) {
				outputStream.write(buffer, 0, readCount);
			}
		} catch (Exception e) {
			throw new FileDownloadException();
		}
	}

}
