package me.depther.service.impl;

import me.depther.model.PromotionResponse;
import me.depther.repository.PromotionsRepository;
import me.depther.service.PromotionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PromotionsServiceImpl implements PromotionsService {

	@Autowired
	private PromotionsRepository promotionsRepository;

	@Override
	public PromotionResponse getPromotions() throws Exception {
		return promotionsRepository.selectList();
	}

}
