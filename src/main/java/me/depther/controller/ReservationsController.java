package me.depther.controller;

import me.depther.model.ReservationInfoResponse;
import me.depther.model.ReservationParam;
import me.depther.model.ReservationResponse;
import me.depther.service.ReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//@RestController("/api/reservations")
public class ReservationsController {

	@Autowired
	private ReservationsService reservationsService;

	@PostMapping
	public ReservationResponse postReservationHandler(ReservationParam reservationParam) throws Exception {
		return reservationsService.setReservation(reservationParam);
	}

	@GetMapping
	public ReservationInfoResponse getReservationInfoHandler(String reservationEmail) throws Exception {
		return reservationsService.getReservationInfo(reservationEmail);
	}

	@PutMapping("/{reservationInfoId}")
	public ReservationResponse putReservationHandler(
			@PathVariable(name="reservationInfoId") int reservationInfoId) throws Exception {
		return reservationsService.cancleReservation(reservationInfoId);
	}

}
