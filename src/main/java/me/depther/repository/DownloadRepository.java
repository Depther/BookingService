package me.depther.repository;

import me.depther.model.ImageFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;

import static me.depther.repository.DownloadSqls.SELECT_IMAGE;


@Repository
public class DownloadRepository {

	@Autowired
	private NamedParameterJdbcTemplate jdbcTemplate;

	private RowMapper<ImageFile> imageFileRowMapper = BeanPropertyRowMapper.newInstance(ImageFile.class);

	public ImageFile downloadImage(int fileId) {
		return jdbcTemplate.queryForObject(SELECT_IMAGE, Collections.singletonMap("fileId", fileId), imageFileRowMapper);
	}
}
