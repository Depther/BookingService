package me.depther.repository;

import me.depther.model.Promotion;
import me.depther.model.PromotionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import static me.depther.repository.PromotionsSqls.SELECT_ITEMS;

@Repository
public class PromotionsRepository {

	@Autowired
	private NamedParameterJdbcTemplate jdbcTemplate;

	private RowMapper<Promotion> rowMapper = BeanPropertyRowMapper.newInstance(Promotion.class);

	public PromotionResponse selectList() throws Exception {
		return new PromotionResponse(jdbcTemplate.query(SELECT_ITEMS, rowMapper));
	}

}
