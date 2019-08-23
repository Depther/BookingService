package me.depther.repository;

class PromotionsSqls {

	static final String SELECT_ITEMS =
			"SELECT A.id, " +
			"       A.product_id, " +
			"       C.id as fileId" +
			"  FROM promotion A" +
			" INNER JOIN product_image B " +
			"    ON A.product_id = B.product_id" +
			" INNER JOIN file_info C " +
			"    ON B.file_id = C.id" +
			"   AND B.type = 'th'";

}
