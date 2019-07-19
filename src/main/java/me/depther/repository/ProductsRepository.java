package me.depther.repository;

import me.depther.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

import static me.depther.repository.ProductsSqls.*;

@Repository
public class ProductsRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private RowMapper<Product> rowMapper = BeanPropertyRowMapper.newInstance(Product.class);

	public int selectPartCount(int categoryId) throws Exception {
		return jdbcTemplate.queryForObject(SELECT_PART_COUNT, Integer.class, categoryId);
	}

	public List<Product> selectPartList(int categoryId, int start) throws Exception {
		return jdbcTemplate.query(SELECT_PART_ITEMS, rowMapper, categoryId, start);
	}

	public int selectAllCount() throws Exception {
		return jdbcTemplate.queryForObject(SELECT_ALL_COUNT, Integer.class);
	}

	public List<Product> selectAllList(int start) {
		return jdbcTemplate.query(SELECT_ALL_ITEMS, rowMapper, start);
	}

}
