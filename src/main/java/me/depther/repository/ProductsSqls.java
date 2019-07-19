package me.depther.repository;

public class ProductsSqls {

	public static final String SELECT_PART_COUNT =
			"SELECT count(*)" +
			"  FROM category A, " +
			"       product B, " +
			"       display_info C, " +
			"       product_image D, " +
			"       file_info E" +
			" WHERE A.id = B.category_id" +
			"   AND B.id = C.product_id" +
			"   AND B.id = D.product_id" +
			"   AND D.file_id = E.id" +
			"   AND D.type = 'th'" +
			"   AND A.id = ?";

	public static final String SELECT_ALL_COUNT =
			"SELECT count(*)" +
			"  FROM category A, " +
			"       product B, " +
			"       display_info C, " +
			"       product_image D, " +
			"       file_info E" +
			" WHERE A.id = B.category_id" +
			"   AND B.id = C.product_id" +
			"   AND B.id = D.product_id" +
			"   AND D.file_id = E.id" +
			"   AND D.type = 'th'";

	public static final String SELECT_PART_ITEMS =
			"SELECT C.id as displayInfoId," +
			"       C.place_name as placeName," +
			"       B.content as productContent, " +
			"       B.description as productDescription, " +
			"       B.id as productId," +
			"       E.save_file_name as productImageUrl" +
			"  FROM category A, " +
			"       product B, " +
			"       display_info C, " +
			"       product_image D, " +
			"       file_info E" +
			" WHERE A.id = B.category_id" +
			"   AND B.id = C.product_id" +
			"   AND B.id = D.product_id" +
			"   AND D.file_id = E.id" +
			"   AND D.type = 'th'" +
			"   AND A.id = ?" +
			" LIMIT 4 OFFSET ?";

	public static final String SELECT_ALL_ITEMS =
			"SELECT C.id as displayInfoId," +
			"       C.place_name as placeName," +
			"       B.content as productContent, " +
			"       B.description as productDescription, " +
			"       B.id as productId," +
			"       E.save_file_name as productImageUrl" +
			"  FROM category A, " +
			"       product B, " +
			"       display_info C, " +
			"       product_image D, " +
			"       file_info E" +
			" WHERE A.id = B.category_id" +
			"   AND B.id = C.product_id" +
			"   AND B.id = D.product_id" +
			"   AND D.file_id = E.id" +
			"   AND D.type = 'th'" +
			" LIMIT 4 OFFSET ?";

}