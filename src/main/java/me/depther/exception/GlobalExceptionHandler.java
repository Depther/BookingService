package me.depther.exception;

import me.depther.model.ExceptionResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;

@RestControllerAdvice("me.depther.controller")
@PropertySource("classpath:/errorMessage.properties")
public class GlobalExceptionHandler extends RuntimeException {

	@Autowired
	private Environment env;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@ExceptionHandler(RuntimeException.class)
	public ExceptionResponse runtimeExceptionHandler(Exception e) throws Exception {
		logger.error(e.toString());
		return new ExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, env.getProperty("message.error.runtime-exception"));
	}

	@ExceptionHandler(EmptyResultDataAccessException.class)
	public ExceptionResponse noContentExceptionHandler(HttpServletResponse response, Exception e) throws Exception {
		logger.error(e.toString());
		return new ExceptionResponse(HttpStatus.NO_CONTENT, env.getProperty("message.error.no-content"));
	}

	@ExceptionHandler(UnSupportedFileException.class)
	public ExceptionResponse unSupportedFileException(Exception e) throws Exception{
		logger.error(e.toString());
		return new ExceptionResponse(HttpStatus.BAD_REQUEST, env.getProperty("message.error.unsupported-file-exception"));
	}

	@ExceptionHandler(FileDownloadException.class)
	public ExceptionResponse fileDownloadException(Exception e) throws Exception {
		logger.error(e.toString());
		return new ExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, env.getProperty("message.error.file-download-exception"));
	}

	@ExceptionHandler(FileUploadException.class)
	public ExceptionResponse fileUploadException(Exception e) throws Exception {
		logger.error(e.toString());
		return new ExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, env.getProperty("message.error.file-upload-exception"));
	}

}
