package me.depther.service.impl;

import me.depther.model.*;
import me.depther.repository.ReservationsRepository;
import me.depther.service.ReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
public class ReservationsServiceImpl implements ReservationsService {

	@Autowired
	private ReservationsRepository reservationsRepository;

	@Override
	public ReservationResponse insertReservation(ReservationParam reservationParam) throws Exception {
		Long reservationInfoId =  reservationsRepository.insertReservationInfo(reservationParam);
		reservationsRepository.insertReservationInfoPrice(reservationParam, reservationInfoId);
		/*
			Q. 예약 데이터를 Insert한 이후 아래와 같이 Insert한 결과를 다시 Select해서 클라이언트에게 반환하는게 맞나요?
			한번 더 DB에 접근하는게 성능에 영향을 줄 것 같아서 질문드립니다.
		 */
		return reservationsRepository.selectReservationResult(reservationInfoId);
	}

	@Override
	@Transactional
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
		return reservationsRepository.selectReservationResult(reservationInfoId);
	}

	@Override
	public CommentResponse postComment(long reservationInfoId, MultipartFile file, String comment, int productId, int score) throws Exception {
		return reservationsRepository.postComment(reservationInfoId, file, comment, productId, score);
	}
}
