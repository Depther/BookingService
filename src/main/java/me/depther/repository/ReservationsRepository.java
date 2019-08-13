package me.depther.repository;

import me.depther.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static me.depther.repository.ReservationsSqls.*;

@Repository
public class ReservationsRepository {

	@Autowired
	private NamedParameterJdbcTemplate jdbcTemplate;

	private RowMapper<ReservationResponse> reservationResponseRowMapper = BeanPropertyRowMapper.newInstance(ReservationResponse.class);

	private RowMapper<ReservationPrice> reservationInfoPriceRowMapper = BeanPropertyRowMapper.newInstance(ReservationPrice.class);

	private RowMapper<ReservationInfo> reservationInfoRowMapper = BeanPropertyRowMapper.newInstance(ReservationInfo.class);

	private RowMapper<DisplayInfo> displayInfoRowMapper = BeanPropertyRowMapper.newInstance(DisplayInfo.class);

	public Long insertReservationInfo(ReservationParam reservationParam) throws Exception {
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(INSERT_RESERVATION_INFO, new BeanPropertySqlParameterSource(reservationParam), keyHolder);
		return (Long)keyHolder.getKey();
	}

	/*
		Q. 여기서 마땅히 반환할만한 것이 생각나지 않아서 return 타입을 void로 했는데 괜찮을까요?
		아니면 무언가를 반환해줘야할까요?
	 */
	public void insertReservationInfoPrice(ReservationParam reservationParam, Long reservationInfoId) throws Exception {
		for (ReservationPrice price : reservationParam.getPrices()) {
			jdbcTemplate.update(INSERT_RESERVATION_INFO_PRICE, new MapSqlParameterSource()
							.addValue("reservationInfoId", reservationInfoId)
			                .addValue("productPriceId", price.getProductPriceId())
			                .addValue("count", price.getCount()));
		}
	}

	public ReservationResponse selectReservationResult(Long reservationInfoId) throws Exception {
		Map<String, Long> map = new HashMap();
		map.put("reservationInfoId", reservationInfoId);
		ReservationResponse reservationResponse = jdbcTemplate.queryForObject(SELECT_RESERVATION_RESULT, map, reservationResponseRowMapper);
		List<ReservationPrice> reservationPrices = jdbcTemplate.query(SELECT_RESERVATION_INFO_PRICE, map, reservationInfoPriceRowMapper);
		reservationResponse.setPrices(reservationPrices);
		return reservationResponse;
	}

	public List<ReservationInfo> selectReservationInfos(String reservationEmail) throws Exception {
		return jdbcTemplate.query(SELECT_RESERVATION_INFOS, Collections.singletonMap("reservationEmail", reservationEmail), reservationInfoRowMapper);
	}

	public DisplayInfo selectDisplayInfos(int displayInfoId) throws Exception {
		return jdbcTemplate.queryForObject(SELECT_DISPLAY_INFOS, Collections.singletonMap("displayInfoId", displayInfoId) , displayInfoRowMapper);
	}

	public void cancelReservation(long reservationInfoId) throws Exception {
		jdbcTemplate.update(CANCEL_RESERVATION, Collections.singletonMap("reservationInfoId", reservationInfoId));
	}

}
