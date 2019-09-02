package me.depther.service.impl;

import me.depther.exception.FileUploadException;
import me.depther.exception.UnSupportedFileException;
import me.depther.model.*;
import me.depther.repository.ReservationsRepository;
import me.depther.service.ReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReservationsServiceImpl implements ReservationsService {

	@Autowired
	private ReservationsRepository reservationsRepository;

	private static final String STORAGE_ROUTE = "/app_storage/boostcourse/";

	@Override
	@Transactional
	public ReservationResponse insertReservation(ReservationParam reservationParam) throws Exception {
		int reservationInfoId =  reservationsRepository.insertReservationInfo(reservationParam);
		reservationsRepository.insertReservationInfoPrice(reservationParam, reservationInfoId);
		return reservationsRepository.selectReservationResponse(reservationInfoId);
	}

	@Override
	public ReservationInfoResponse selectReservationInfo(String reservationEmail) throws Exception {
		List<ReservationInfo> reservationInfos = reservationsRepository.selectReservationInfos(reservationEmail);
		for (ReservationInfo item : reservationInfos) {
			item.setDisplayInfo(reservationsRepository.selectDisplayInfos(item.getDisplayInfoId()));
		}
		return new ReservationInfoResponse(reservationInfos, reservationInfos.size());
	}

	@Override
	@Transactional
	public ReservationResponse cancelReservation(int reservationInfoId) throws Exception {
		reservationsRepository.cancelReservation(reservationInfoId);
		return reservationsRepository.selectReservationResponse(reservationInfoId);
	}

	@Override
	@Transactional
	public CommentResponse insertComment(int productId, int reservationInfoId, String comment, int score, MultipartFile file) throws Exception {
		int commentId = reservationsRepository.insertComment(productId, reservationInfoId, comment, score);
		CommentResponse commentResponse = reservationsRepository.selectCommentResponse(commentId);

		if (file != null) {
			int imageId = insertCommentFile(file, reservationInfoId, commentId);
			commentResponse.setCommentImage(reservationsRepository.selectCommentImage(imageId));
		}

		return commentResponse;
	}

	private int insertCommentFile(MultipartFile file, int reservationInfoId, int commentId) throws Exception {
		int delimiterIdx = file.getOriginalFilename().lastIndexOf(".");
		String fileName = file.getOriginalFilename().substring(0, delimiterIdx);
		String fileExtension = file.getOriginalFilename().substring(delimiterIdx + 1);
		String dateTimeStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
		String saveFileName = STORAGE_ROUTE + fileName + "_" + dateTimeStr + "." + fileExtension;
		String fileContentType = file.getContentType();

		if (!fileContentType.endsWith("jpeg") && !fileContentType.endsWith("png")) {
			throw new UnSupportedFileException();
		}

		try (InputStream inputStream = file.getInputStream();
			 OutputStream outputStream = new FileOutputStream(saveFileName)) {
			int readCount = 0;
			byte[] buffer = new byte[1024];
			while ((readCount = inputStream.read(buffer)) != -1) {
				outputStream.write(buffer, 0, readCount);
			}
		} catch(Exception e) {
			throw new FileUploadException();
		}

		int fileId = reservationsRepository.insertCommentFile(file.getOriginalFilename(), saveFileName, file.getContentType());
		return reservationsRepository.insertCommentImage(reservationInfoId, commentId, fileId);
	}

}