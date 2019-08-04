package me.depther.service.impl;

import me.depther.model.ReservationInfoResponse;
import me.depther.model.ReservationParam;
import me.depther.model.ReservationResponse;
import me.depther.repository.ReservationsRepository;
import me.depther.service.ReservationsService;
import org.springframework.stereotype.Service;

@Service
public class ReservationsServiceImpl implements ReservationsService {

	private ReservationsRepository reservationsRepository;

	@Override
	public ReservationResponse setReservation(ReservationParam reservationParam) throws Exception {
		return reservationsRepository.setReservation(reservationParam);
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
