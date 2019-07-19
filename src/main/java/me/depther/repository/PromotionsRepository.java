package me.depther.repository;

import me.depther.model.Promotion;
import me.depther.model.PromotionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class PromotionsRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private RowMapper<Promotion> rowMapper = BeanPropertyRowMapper.newInstance(Promotion.class);

	private final String SELECT_ITEMS = "SELECT A.id, A.product_id, C.save_file_name as productImageUrl FROM promotion A, product_image B, file_info C WHERE A.product_id = B.product_id AND B.file_id = C.id AND C.save_file_name LIKE '%th%'";

	public PromotionResponse selectList() throws Exception {
		return new PromotionResponse(jdbcTemplate.query(SELECT_ITEMS, rowMapper));
	}

}
