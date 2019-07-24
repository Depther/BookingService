package me.depther.repository;

class PromotionsSqls {

	static final String SELECT_ITEMS = "SELECT A.id, A.product_id, C.save_file_name as productImageUrl FROM promotion A, product_image B, file_info C WHERE A.product_id = B.product_id AND B.file_id = C.id AND C.save_file_name LIKE '%th%'";

}
