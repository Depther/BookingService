package me.depther.service;

import me.depther.model.*;
import org.springframework.web.multipart.MultipartFile;

public interface ReservationsService {

	ReservationResponse insertReservation(ReservationParam reservationParam) throws Exception;

	ReservationInfoResponse selectReservationInfo(String reservationEmail) throws Exception;

	ReservationResponse cancelReservation(int reservationInfoId) throws Exception;

	CommentResponse insertComment(int productId, int reservationInfoId, String comment, int score, MultipartFile file) throws Exception;

	CommentImage selectCommentImage(int commentImageId) throws Exception;
}
