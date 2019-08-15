package me.depther.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;
import java.time.LocalDate;

@Controller
public class ViewController {

	@GetMapping("/")
	public String mainView(HttpSession session, Model model) {
		return "main";
	}

	@GetMapping("/detail/{displayInfoId}")
	public String detailView(HttpSession session, Model model) {
		return "detail";
	}

	@GetMapping("/review/{displayInfoId}")
	public String reviewView() {
		return "review";
	}

	@GetMapping("/reserve/{displayInfoId}")
	public String reserveView(Model model) {
		LocalDate showDate = LocalDate.now().plusDays((long)(Math.random() * 5));
		model.addAttribute("showDate", showDate);
		return "reserve";
	}

	@GetMapping("/bookinglogin")
	public String bookingLoginView() {
		return "bookinglogin";
	}

	@GetMapping("/myReservation")
	public String myReservationView() {
		return "myReservation";
	}

	@GetMapping("/reviewWrite")
	public String reviewWrite() {
		return "reviewWrite";
	}
}
