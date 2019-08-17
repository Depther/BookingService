package me.depther.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import me.depther.model.CommentResponse;
import me.depther.model.ReservationInfoResponse;
import me.depther.model.ReservationParam;
import me.depther.model.ReservationResponse;
import me.depther.service.ReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

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
	public ReservationInfoResponse getReservationInfoHandler(@RequestParam(name="reservationEmail") String reservationEmail, HttpSession session) throws Exception {
		ReservationInfoResponse reservationInfoResponse = reservationsService.selectReservationInfo(reservationEmail);
		if (session.getAttribute("email") == null && reservationInfoResponse.getSize() > 0) {
			session.setAttribute("email", reservationEmail);
			session.setMaxInactiveInterval(60 * 5);
		}
		return reservationInfoResponse;
	}

	@PutMapping("/{reservationInfoId}")
	public ReservationResponse putReservationHandler(@PathVariable(name="reservationInfoId") long reservationInfoId) throws Exception {
		return reservationsService.cancelReservation(reservationInfoId);
	}

	@PostMapping("/{reservationInfoId}/comments")
	public CommentResponse postCommentHandler(@PathVariable("reservationInfoId") long reservationInfoId,
											  @RequestParam("reviewImage") MultipartFile file,
											  @RequestParam("comment") String comment,
											  @RequestParam("productId") int productId,
											  @RequestParam("score") int score) throws Exception {
		System.out.println(file);
		System.out.println(reservationInfoId);
		System.out.println(comment);
		System.out.println(productId);
		System.out.println(score);
//		return reservationsService.postComment(reservationInfoId, file, comment, productId, score);
		return null;
	}

}
