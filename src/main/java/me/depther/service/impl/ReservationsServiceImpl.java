package me.depther.service.impl;

import me.depther.model.*;
import me.depther.repository.ReservationsRepository;
import me.depther.service.ReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ReservationsServiceImpl implements ReservationsService {

	@Autowired
	private ReservationsRepository reservationsRepository;

	@Override
	public ReservationResponse insertReservation(ReservationParam reservationParam) throws Exception {
		Long reservationInfoId =  reservationsRepository.insertReservationInfo(reservationParam);
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
	public ReservationResponse cancelReservation(long reservationInfoId) throws Exception {
		reservationsRepository.cancelReservation(reservationInfoId);
		return reservationsRepository.selectReservationResponse(reservationInfoId);
	}

	@Override
	@Transactional
	public CommentResponse insertComment(long productId, long reservationInfoId, String comment, int score, MultipartFile file) throws Exception {
		int commentId = reservationsRepository.insertComment(productId, reservationInfoId, comment, score);
		int fileId = reservationsRepository.insertCommentFile(file.getOriginalFilename(), file.getOriginalFilename(), file.getContentType());
		int imageId = reservationsRepository.insertCommentImage(reservationInfoId, commentId, fileId);
		return reservationsRepository.selectCommentResponse(commentId, imageId);
	}
}
