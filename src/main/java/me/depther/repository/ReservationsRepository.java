package me.depther.repository;

import me.depther.model.ReservationInfoResponse;
import me.depther.model.ReservationParam;
import me.depther.model.ReservationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import static me.depther.repository.ReservationsSqls.*;

@Repository
public class ReservationsRepository {

	@Autowired
	private NamedParameterJdbcTemplate jdbcTemplate;

	public ReservationResponse setReservation(ReservationParam reservationParam) throws Exception {
		return null;
	}

	public ReservationInfoResponse getReservationInfo(String reservationEmail) throws Exception {
		return null;
	}

	public ReservationResponse cancleReservation(int reservationInfoId) throws Exception {
		return null;
	}

}
