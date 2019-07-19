package me.depther.controller;

import me.depther.model.CategoryResponse;
import me.depther.service.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoriesController {

	@Autowired
	private CategoriesService categoriesService;

	@GetMapping
	public CategoryResponse getCategoryHandler() throws Exception {
		return categoriesService.getCategories();
	}

}
