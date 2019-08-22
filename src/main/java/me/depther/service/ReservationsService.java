package me.depther.service;

import me.depther.model.CommentResponse;
import me.depther.model.ReservationInfoResponse;
import me.depther.model.ReservationParam;
import me.depther.model.ReservationResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public interface ReservationsService {

	ReservationResponse insertReservation(ReservationParam reservationParam) throws Exception;

	ReservationInfoResponse selectReservationInfo(String reservationEmail) throws Exception;

	ReservationResponse cancelReservation(long reservationInfoId) throws Exception;

	CommentResponse insertComment(long productId, long reservationInfoId, String comment, int score, MultipartFile file) throws Exception;

}
