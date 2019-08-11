package me.depther.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@RestController
@RequestMapping("/api/date")
public class DateController {

	@GetMapping
	public LocalDate getDateHandler() {
		return LocalDate.now().plus((long)(Math.random() * 5), ChronoUnit.DAYS);
	}

}
