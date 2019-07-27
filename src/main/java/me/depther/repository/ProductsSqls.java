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
			"   AND A.id = :categoryId";

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
			"   AND A.id = :categoryId" +
			" LIMIT 4 OFFSET :start";

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
			" LIMIT 4 OFFSET :start";

	static final String SELECT_DISPLAY_INFO =
			"SELECT A.create_date," +
			"       A.id as displayInfoId," +
			"       A.email," +
			"       A.homepage," +
			"       A.modify_date as modifyDate," +
			"       A.opening_hours as openingHours," +
			"       A.place_lot as placeLot," +
			"       A.place_name as placeName," +
			"       A.place_street as placeStreet," +
			"       A.tel as telephone," +
			"       B.content as productContent," +
			"       B.description as productDescription," +
			"       B.event as productEvent," +
			"       B.id as productId," +
			"       C.id as categoryId," +
			"       C.name as categoryName" +
			"  FROM display_info as A" +
			" INNER JOIN product as B ON A.product_id = B.id" +
			" INNER JOIN category as C ON B.category_id = C.id" +
			" WHERE A.id = :displayInfoId";

	static final String SELECT_PRODUCT_IMAGES =
			"SELECT B.id as productId," +
			"       C.id as productImageId," +
			"       C.type," +
			"       D.id as fileInfoId," +
			"       D.file_name as fileName," +
			"       D.save_file_name as saveFileName," +
			"       D.content_type as ContentType," +
			"       D.delete_flag as deleteFlag," +
			"       D.create_date as createDate," +
			"       D.modify_date as modifyDate" +
			"  FROM display_info as A" +
			" INNER JOIN product as B ON A.product_id = B.id" +
			" INNER JOIN product_image as C ON B.id = C.product_id" +
			" INNER JOIN file_info as D ON C.file_id = D.id" +
			" WHERE A.id = :displayInfoId" +
			"   AND C.type IN ('ma', 'et')" +
			" ORDER BY C.type DESC" +
			" LIMIT 2";

	static final String SELECT_DISPLAY_INFO_IMAGE =
			"SELECT A.id as displayInfoImageId," +
			"       B.id as displayInfoId," +
			"       A.file_id as fileId," +
			"       C.file_name as fileName," +
			"       C.save_file_name as saveFileName," +
			"       C.content_type as contentType," +
			"       C.delete_flag as deleteFlag," +
			"       C.create_date as createDate," +
			"       C.modify_date as modifyDate" +
			"  FROM display_info_image as A" +
			" INNER JOIN display_info as B ON A.display_info_id = B.id" +
			" INNER JOIN file_info as C ON A.file_id = C.id" +
			" WHERE B.id = :displayInfoId";

	static final String SELECT_COMMENTS =
			"SELECT A.id as commentId," +
			"       A.product_id as productId," +
			"       A.reservation_info_id as reservationInfoId," +
			"       A.score," +
			"       A.comment," +
			"       B.reservation_name as reservationName," +
			"       B.reservation_tel as reservationTelephone," +
			"       B.reservation_email as reservationEmail," +
			"       B.reservation_date as reservationDate," +
			"       B.create_date as createDate," +
			"       B.modify_date as modifyDate" +
			"  FROM reservation_user_comment as A" +
			" INNER JOIN reservation_info as B ON A.reservation_info_id = B.id" +
			" INNER JOIN display_info as C ON B.display_info_id = C.id" +
			" WHERE C.id = :displayInfoId";

	static final String SELECT_COMMENT_IMAGES =
			"SELECT A.content_type as contentType," +
			"       A.create_date as createDate," +
			"       A.delete_flag as deleteFlag," +
			"       A.id as fileId," +
			"       A.file_name as fileName," +
			"       B.id as imageId," +
			"       A.modify_date as modifyDate," +
			"       B.reservation_info_id as reservationInfoId," +
			"       B.reservation_user_comment_id as reservationUserCommentId," +
			"       A.save_file_name as saveFileName" +
			"  FROM file_info as A" +
			" INNER JOIN reservation_user_comment_image as B ON A.id = B.file_id" +
			" WHERE B.reservation_user_comment_id = :commentId";

	static final String SELECT_AVG_SCORE =
			"SELECT avg(C.score)" +
			"  FROM display_info as A" +
			" INNER JOIN reservation_info as B ON A.id = B.display_info_id" +
			" INNER JOIN reservation_user_comment as C ON B.id = C" +
			".reservation_info_id" +
			" WHERE A.id = :displayInfoId";

	static final String SELECT_PRODUCT_PRICE =
			"SELECT A.id as productPriceId," +
			"       A.product_id as productId," +
			"       A.price_type_name as priceTypeName," +
			"       A.price," +
			"       A.discount_rate as discountRate," +
			"       A.create_date as createDate," +
			"       A.modify_date as modifyDate" +
			"  FROM product_price as A" +
			" INNER JOIN product as B ON A.product_id = B.id" +
			" INNER JOIN display_info as C ON B.id = C.product_id" +
			" WHERE C.id = :displayInfoId";

}