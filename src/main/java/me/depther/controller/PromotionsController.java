package me.depther.controller;

import me.depther.model.PromotionResponse;
import me.depther.service.PromotionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/promotions")
public class PromotionsController {

	@Autowired
	private PromotionsService promotionsService;

	@GetMapping
	public PromotionResponse getPromotionsHandler() throws Exception {
		return promotionsService.getPromotions();
	}

}
