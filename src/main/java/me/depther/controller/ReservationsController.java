package me.depther.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import me.depther.model.ReservationInfoResponse;
import me.depther.model.ReservationParam;
import me.depther.model.ReservationResponse;
import me.depther.service.ReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
public class ReservationsController {

	@Autowired
	private ReservationsService reservationsService;

	private ObjectMapper mapper = new ObjectMapper();

	@PostMapping
	public ReservationResponse postReservationHandler(@RequestBody String jsonReq) throws Exception {
		ReservationParam reservationParam = mapper.readValue(jsonReq, ReservationParam.class);
		return reservationsService.insertReservation(reservationParam);
	}

	@GetMapping
	public ReservationInfoResponse getReservationInfoHandler(String jsonReq) throws Exception {
		System.out.println(jsonReq);
//		return reservationsService.getReservationInfo(reservationEmail);
		return null;
	}

	@PutMapping("/{reservationInfoId}")
	public ReservationResponse putReservationHandler(
			@PathVariable(name="reservationInfoId") int reservationInfoId) throws Exception {
		return reservationsService.cancleReservation(reservationInfoId);
	}

}
