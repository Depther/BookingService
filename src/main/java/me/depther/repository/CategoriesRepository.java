package me.depther.repository;

import me.depther.model.Category;
import me.depther.model.CategoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import static me.depther.repository.CategoriesSqls.SELECT_ITEMS;

@Repository
public class CategoriesRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private RowMapper<Category> rowMapper = BeanPropertyRowMapper.newInstance(Category.class);

	public CategoryResponse selectList() throws Exception {
		return new CategoryResponse(jdbcTemplate.query(SELECT_ITEMS, rowMapper));
	}

}
