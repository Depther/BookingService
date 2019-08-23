package me.depther.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import me.depther.exception.FileDownloadException;
import me.depther.model.*;
import me.depther.service.ReservationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;

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
											  @RequestParam(value = "reviewImage", required = false) MultipartFile file,
											  @RequestParam("comment") String comment,
											  @RequestParam("productId") int productId,
											  @RequestParam("score") int score) throws Exception {
		return reservationsService.insertComment(productId, reservationInfoId, comment, score, file);
	}

	@GetMapping("/commentImage/{commentImageId}")
	public void getCommnetImageHandler(@PathVariable("commentImageId") int commentImageId, HttpServletResponse response) throws Exception {
		CommentImage commentImage = reservationsService.selectCommentImage(commentImageId);
		response.setHeader("Content-Disposition", "attachment; filename=" + commentImage.getFileName());
		try (InputStream inputStream = new FileInputStream(commentImage.getSaveFileName());
			 OutputStream outputStream = response.getOutputStream()) {
			int readCount = 0;
			byte[] buffer = new byte[1024];
			while ((readCount = inputStream.read(buffer)) != -1) {
				outputStream.write(buffer, 0, readCount);
			}
		} catch(Exception e) {
			throw new FileDownloadException();
		}
	}

}
