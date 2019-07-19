package me.depther.service.impl;

import me.depther.model.ProductResponse;
import me.depther.repository.ProductsRepository;
import me.depther.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductsServiceImpl implements ProductsService {

	@Autowired
	private ProductsRepository productsRepository;

	@Override
	public ProductResponse getProducts(int categoryId, int start) throws Exception {
		ProductResponse response = new ProductResponse();
		if (categoryId != 0) {
			response.setTotalCount(productsRepository.selectPartCount(categoryId));
			response.setItems(productsRepository.selectPartList(categoryId, start));
		} else {
			response.setTotalCount(productsRepository.selectAllCount());
			response.setItems(productsRepository.selectAllList(start));
		}
		return response;
	}

}