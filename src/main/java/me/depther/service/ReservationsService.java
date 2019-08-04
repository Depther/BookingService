package me.depther.service;

import me.depther.model.ReservationInfoResponse;
import me.depther.model.ReservationParam;
import me.depther.model.ReservationResponse;

public interface ReservationsService {

	ReservationResponse setReservation(ReservationParam reservationParam) throws Exception;

	ReservationInfoResponse getReservationInfo(String reservationEmail) throws Exception;

	ReservationResponse cancleReservation(int reservationInfoId) throws Exception;

}
