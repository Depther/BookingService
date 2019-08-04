package me.depther.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

	@GetMapping("/detail/{displayInfoId}")
	public String detailView() {
		return "detail";
	}

	@GetMapping("/review/{displayInfoId}")
	public String reviewView() {
		return "review";
	}

	@GetMapping("/myReservation")
	public String myReservationView() {
		return "myReservation";
	}

	@GetMapping("/reserve/{displayInfoId}")
	public String reserveView() {
		return "reserve";
	}

	@GetMapping("/bookinglogin")
	public String bookingLoginView() {
		return "bookinglogin";
	}
}
