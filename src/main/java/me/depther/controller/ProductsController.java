package me.depther.controller;

import me.depther.model.DisplayInfoResponse;
import me.depther.model.ProductResponse;
import me.depther.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductsController {

	@Autowired
	private ProductsService productsService;

	@GetMapping
	public ProductResponse getProductsHandler(@RequestParam(name="categoryId", required=false, defaultValue ="0") int categoryId,
											  @RequestParam(name="start", required=false, defaultValue="0") int start) throws Exception {
		return productsService.getProducts(categoryId, start);
	}

	@GetMapping("/{displayInfoId}")
	public DisplayInfoResponse getProductDetailHandler(@PathVariable(name="displayInfoId") int displayInfoId) throws Exception {
		return productsService.getProductDetail(displayInfoId);
	}

}
