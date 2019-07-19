package me.depther.repository;

import me.depther.model.Category;
import me.depther.model.CategoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class CategoriesRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private RowMapper<Category> rowMapper = BeanPropertyRowMapper.newInstance(Category.class);

	private final String SELECT_ITEMS = "SELECT A.id, A.name, count(*) as count FROM category A, product B WHERE A.id = B.category_id GROUP BY B.category_id";

	public CategoryResponse selectList() throws Exception {
		return new CategoryResponse(jdbcTemplate.query(SELECT_ITEMS, rowMapper));
	}

}
