package me.depther.service;

import me.depther.model.ReservationInfoResponse;
import me.depther.model.ReservationParam;
import me.depther.model.ReservationResponse;

public interface ReservationsService {

	ReservationResponse insertReservation(ReservationParam reservationParam) throws Exception;

	ReservationInfoResponse selectReservationInfo(String reservationEmail) throws Exception;

	ReservationResponse cancelReservation(long reservationInfoId) throws Exception;

}
