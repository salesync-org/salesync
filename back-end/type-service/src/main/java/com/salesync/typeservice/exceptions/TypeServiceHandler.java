package com.salesync.typeservice.exceptions;

import java.text.MessageFormat;

import com.salesync.typeservice.dtos.ResponseErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

@RestControllerAdvice
public class TypeServiceHandler {

	/*
	 * Custom exceptions
	 */

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleNotValidException(MethodArgumentNotValidException ex) {
		String message = ex.getMessage();
		if(ex.getFieldError() != null) {
			message = MessageFormat.format("{0} {1}", ex.getFieldError().getField(),
					ex.getFieldError().getDefaultMessage());
		}

		return ResponseEntity.badRequest().body(
				ResponseErrorDto.builder().status(HttpStatus.BAD_REQUEST.value()).message(message).build()
		);
	}

	@ExceptionHandler(ObjectNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ResponseEntity<?> handleNotFoundException(ObjectNotFoundException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
				ResponseErrorDto.builder().status(HttpStatus.NOT_FOUND.value()).message(ex.getMessage()).build()
		);
	}

	@ExceptionHandler(HandlerMethodValidationException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<?> handleHandlerMethodValidationException(HandlerMethodValidationException ex) {
		return ResponseEntity.badRequest().body(
				ResponseErrorDto.builder().status(HttpStatus.BAD_REQUEST.value()).message(ex.getMessage()).build()
		);
	}

	@ExceptionHandler(TypeServiceException.class)
	public ResponseEntity<?> handleNotFoundException(TypeServiceException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
				ResponseErrorDto.builder().status(HttpStatus.NOT_FOUND.value()).message(ex.getMessage()).build()
		);
	}

	/*
	 * Java exceptions
	 */

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException ex) {
		return ResponseEntity.badRequest().body(
				ResponseErrorDto.builder().status(HttpStatus.BAD_REQUEST.value()).message(ex.getMessage()).build()
		);
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<?> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
		return ResponseEntity.badRequest().body(
				ResponseErrorDto.builder().status(HttpStatus.BAD_REQUEST.value()).message(ex.getMessage()).build()
		);
	}

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<?> handleBadRequestException(BadRequestException ex) {
		return ResponseEntity.badRequest().body(
				ResponseErrorDto.builder().status(HttpStatus.BAD_REQUEST.value()).message(ex.getMessage()).build()
		);
	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<?> handleAccessDeniedException(AccessDeniedException ex) {
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
				ResponseErrorDto.builder().status(HttpStatus.FORBIDDEN.value()).message(ex.getMessage()).build()
		);
	}
}
