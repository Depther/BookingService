package me.depther.service;

import me.depther.model.DisplayInfoResponse;
import me.depther.model.ProductResponse;

public interface ProductsService {

	ProductResponse getProducts(int categoryId, int start) throws Exception;

	DisplayInfoResponse getProductDetail(int displayInfoId) throws Exception;

}
