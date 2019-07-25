package me.depther.repository;

import me.depther.model.*;
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

	private RowMapper<Product> productRowMapper = BeanPropertyRowMapper.newInstance(Product.class);

	private RowMapper<DisplayInfo> displayInfoRowMapper = BeanPropertyRowMapper.newInstance(DisplayInfo.class);

	private RowMapper<ProductImage> productImgRowMapper = BeanPropertyRowMapper.newInstance(ProductImage.class);

	private RowMapper<DisplayInfoImage> displayInfoImageRowMapper = BeanPropertyRowMapper.newInstance(DisplayInfoImage.class);

	private RowMapper<Comment> commentRowMapper = BeanPropertyRowMapper.newInstance(Comment.class);

	private RowMapper<CommentImage> commentImgRowMapper = BeanPropertyRowMapper.newInstance(CommentImage.class);

	private RowMapper<ProductPrice> productPriceRowMapper = BeanPropertyRowMapper.newInstance(ProductPrice.class);

	public int selectPartCount(int categoryId) throws Exception {
		return jdbcTemplate.queryForObject(SELECT_PART_COUNT, Collections.singletonMap("categoryId", categoryId), Integer.class);
	}

	public List<Product> selectPartList(int categoryId, int start) throws Exception {
		Map<String, Integer> paramMap = new HashMap<>();
		paramMap.put("categoryId", categoryId);
		paramMap.put("start", start);
		return jdbcTemplate.query(SELECT_PART_ITEMS, paramMap, productRowMapper);
	}

	public int selectAllCount() throws Exception {
		return jdbcTemplate.queryForObject(SELECT_ALL_COUNT, Collections.emptyMap(), Integer.class);
	}

	public List<Product> selectAllList(int start) throws Exception {
		return jdbcTemplate.query(SELECT_ALL_ITEMS, Collections.singletonMap("start", start), productRowMapper);
	}

	public DisplayInfo selectDisplayInfo(int displayInfoId) throws Exception {
		return jdbcTemplate.queryForObject(SELECT_DISPLAY_INFO, Collections.singletonMap("displayInfoId", displayInfoId), displayInfoRowMapper);
	}

	public List<ProductImage> selectProductImages(int displayInfoId) throws Exception {
		return jdbcTemplate.query(SELECT_PRODUCT_IMAGES, Collections.singletonMap("displayInfoId", displayInfoId), productImgRowMapper);
	}

	public DisplayInfoImage selectDisplayInfoImage(int displayInfoId) throws Exception {
		return jdbcTemplate.queryForObject(SELECT_DISPLAY_INFO_IMAGE, Collections.singletonMap("displayInfoId", displayInfoId), displayInfoImageRowMapper);
	}

	public List<Comment> selectComments(int displayInfoId) throws Exception {
		return jdbcTemplate.query(SELECT_COMMENTS, Collections.singletonMap("displayInfoId", displayInfoId), commentRowMapper);
	}

	public List<CommentImage> selectCommentImages(int commentId) throws Exception {
		return jdbcTemplate.query(SELECT_COMMENT_IMAGES, Collections.singletonMap("commentId", commentId), commentImgRowMapper);
	}

	public double selectAvgScore(int displayInfoId) throws Exception {
		return jdbcTemplate.queryForObject(SELECT_AVG_SCORE, Collections.singletonMap("displayInfoId", displayInfoId), Double.class);
	}

	public List<ProductPrice> selectProductPrices(int displayInfoId) throws Exception {
		return jdbcTemplate.query(SELECT_PRODUCT_PRICE, Collections.singletonMap("displayInfoId", displayInfoId), productPriceRowMapper);
	}

}
