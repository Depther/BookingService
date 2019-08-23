package me.depther.service.impl;

import me.depther.model.ImageFile;
import me.depther.repository.DownloadRepository;
import me.depther.service.DownloadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DownloadServiceImpl implements DownloadService {

	@Autowired
	private DownloadRepository downloadRepository;

	@Override
	public ImageFile downloadImage(int fileId) {
		return downloadRepository.downloadImage(fileId);
	}

}
