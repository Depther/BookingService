package me.depther.repository;

class CategoriesSqls {

	static final String SELECT_ITEMS =
			"SELECT A.id, A.name, count(*) as count " +
			"  FROM category A " +
			" INNER JOIN product B ON A.id = B.category_id " +
			" GROUP BY A.id";

}

