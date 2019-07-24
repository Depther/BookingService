package me.depther.repository;

class ProductsSqls {

	static final String SELECT_PART_COUNT =
			"SELECT count(*)" +
			"  FROM category A" +
			" INNER JOIN product B ON A.id = B.category_id" +
			" INNER JOIN display_info C ON B.id = C.product_id" +
			" INNER JOIN product_image D ON B.id = D.product_id" +
			" INNER JOIN file_info E ON D.file_id = E.id" +
			" WHERE D.type = 'th'" +
			"   AND A.id = ?";

	static final String SELECT_ALL_COUNT =
			"SELECT count(*)" +
			"  FROM category A" +
			" INNER JOIN product B ON A.id = B.category_id" +
			" INNER JOIN display_info C ON B.id = C.product_id" +
			" INNER JOIN product_image D ON B.id = D.product_id" +
			" INNER JOIN file_info E ON D.file_id = E.id" +
			" WHERE D.type = 'th'";

	static final String SELECT_PART_ITEMS =
			"SELECT C.id as displayInfoId," +
			"       C.place_name as placeName," +
			"       B.content as productContent," +
			"       B.description as productDescription," +
			"       B.id as productId," +
			"       E.save_file_name as productImageUrl" +
			"  FROM category A" +
			" INNER JOIN product B ON A.id = B.category_id" +
			" INNER JOIN display_info C ON B.id = C.product_id" +
			" INNER JOIN product_image D ON B.id = D.product_id" +
			" INNER JOIN file_info E ON D.file_id = E.id" +
			" WHERE D.type = 'th'" +
			"   AND A.id = ? " +
			" LIMIT 4 OFFSET ?";

	static final String SELECT_ALL_ITEMS =
			"SELECT C.id as displayInfoId," +
			"       C.place_name as placeName," +
			"       B.content as productContent," +
			"       B.description as productDescription," +
			"       B.id as productId," +
			"       E.save_file_name as productImageUrl" +
			"  FROM category A" +
			" INNER JOIN product B ON A.id = B.category_id" +
			" INNER JOIN display_info C ON B.id = C.product_id" +
			" INNER JOIN product_image D ON B.id = D.product_id" +
			" INNER JOIN file_info E ON D.file_id = E.id" +
			" WHERE D.type = 'th'" +
			" LIMIT 4 OFFSET ?";

}