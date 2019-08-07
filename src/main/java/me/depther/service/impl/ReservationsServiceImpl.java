package me.depther.service.impl;

import me.depther.model.ReservationInfoResponse;
import me.depther.model.ReservationParam;
import me.depther.model.ReservationResponse;
import me.depther.repository.ReservationsRepository;
import me.depther.service.ReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReservationsServiceImpl implements ReservationsService {

	@Autowired
	private ReservationsRepository reservationsRepository;

	@Override
	@Transactional
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
	public ReservationInfoResponse getReservationInfo(String reservationEmail) throws Exception {
		return reservationsRepository.getReservationInfo(reservationEmail);
	}

	@Override
	public ReservationResponse cancleReservation(int reservationInfoId) throws Exception {
		return reservationsRepository.cancleReservation(reservationInfoId);
	}

}
