package me.depther.exception;

import org.springframework.http.HttpStatus;

public class ExceptionResponse {

	private final HttpStatus status;

	private final String message;

	public ExceptionResponse(HttpStatus status, String message) {
		this.status = status;
		this.message = message;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public String getMessage() {
		return message;
	}

	@Override
	public String toString() {
		return "ExceptionResponse{" +
				"status=" + status +
				", message='" + message + '\'' +
				'}';
	}

}
