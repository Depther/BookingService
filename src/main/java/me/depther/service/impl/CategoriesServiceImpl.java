package me.depther.service.impl;

import me.depther.model.CategoryResponse;
import me.depther.repository.CategoriesRepository;
import me.depther.service.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriesServiceImpl implements CategoriesService {

	@Autowired
	private CategoriesRepository categoriesRepository;

	@Override
	public CategoryResponse getCategories() throws Exception {
		return categoriesRepository.selectList();
	}

}
