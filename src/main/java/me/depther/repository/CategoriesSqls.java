package me.depther.repository;

class CategoriesSqls {

	static final String SELECT_ITEMS = "SELECT A.id, A.name, count(*) as count FROM category A, product B WHERE A.id = B.category_id GROUP BY B.category_id";

}
