package me.depther.repository;

import me.depther.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static me.depther.repository.ProductsSqls.*;

@Repository
public class ProductsRepository {

	@Autowired
	private NamedParameterJdbcTemplate jdbcTemplate;

	private Map<String, Integer> paramMap = new HashMap<>();

	private RowMapper<Product> rowMapper = BeanPropertyRowMapper.newInstance(Product.class);

	public int selectPartCount(int categoryId) throws Exception {
		paramMap.put("categoryId", categoryId);
		return jdbcTemplate.queryForObject(SELECT_PART_COUNT, paramMap, Integer.class);
	}

	public List<Product> selectPartList(int categoryId, int start) throws Exception {
		paramMap.put("categoryId", categoryId);
		paramMap.put("start", start);
		return jdbcTemplate.query(SELECT_PART_ITEMS, paramMap, rowMapper);
	}

	public int selectAllCount() throws Exception {
		return jdbcTemplate.queryForObject(SELECT_ALL_COUNT, Collections.emptyMap(), Integer.class);
	}

	public List<Product> selectAllList(int start) throws Exception {
		paramMap.put("start", start);
		return jdbcTemplate.query(SELECT_ALL_ITEMS, paramMap, rowMapper);
	}

}
