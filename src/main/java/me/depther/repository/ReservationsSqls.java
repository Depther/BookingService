package me.depther.repository;

public class ReservationsSqls {

	public static String INSERT_RESERVATION_INFO =
			"INSERT INTO reservation_info " +
			"(product_id, display_info_id, reservation_name, reservation_tel, reservation_email, reservation_date, create_date, modify_date) " +
			"VALUES " +
			"(:productId, :displayInfoId, :reservationName, :reservationTelephone, :reservationEmail, now(), now(), now())";

	public static String INSERT_RESERVATION_INFO_PRICE = 
			"INSERT INTO reservation_info_price" +
			"(reservation_info_id, product_price_id, count)" +
			"VALUES" +
			"(:reservationInfoId, :productPriceId, :count)";

	public static String SELECT_RESERVATION_RESULT =
			"SELECT id as reservationInfoId," +
			"       cancel_flag as cancelYn," +
			"       create_date as createDate," +
			"       display_info_id as displayInfoId," +
			"       modify_date as modifyDate," +
			"       product_id as productId," +
			"       reservation_date as reservationDate," +
			"       reservation_email as reservationEamil," +
			"       reservation_name as reservationName," +
			"       reservation_tel as reservationTelephone" +
			"  FROM reservation_info" +
			" WHERE id = :reservationInfoId"; 
			

	public static String SELECT_RESERVATION_INFO_PRICE = 
			"SELECT count, " +
			"       product_price_id as productPriceId," +
			"       reservation_info_id as reservationInfoId," +
			"       id as reservationInfoPriceId" +
			"  FROM reservation_info_price" +
			" WHERE reservation_info_id = :reservationInfoId";

	public static String SELECT_RESERVATION_INFOS = 
			"SELECT CASE when A.cancel_flag = 0 then 'false'" +
			"            when A.cancel_flag = 1 then 'true'  " +
			"        END as cancelYn,   " +
			"       A.create_date as createDate,  " +
			"       A.display_info_id as displayInfoId,  " +
			"       A.modify_date as modifyDate, " +
			"       A.product_id as productId,  " +
			"       A.reservation_date as reservationDate, " +
			"       A.reservation_email as reservationEmail,   " +
			"       A.id as reservationInfoId,   " +
			"       A.reservation_name as reservationName," +
			"       A.reservation_tel as reservationTelephone," +
			"       (SELECT SUM(B.count * C.price)" +
			"          FROM reservation_info_price as B" +
			"         INNER JOIN product_price as C ON B.product_price_id = C.id" +
			" WHERE B.reservation_info_id = A.id" +
			" GROUP BY B.reservation_info_id) as totalPrice" +
			"  FROM reservation_info as A" +
			" WHERE reservation_email = :reservationEmail";

	public static String SELECT_DISPLAY_INFOS = 
			"SELECT B.category_id as categoryId," +
			"       C.name as categoryName," +
			"       A.create_date as createDate," +
			"       A.id as displayInfoId," +
			"       A.email as email," +
			"       A.homepage as homepage," +
			"       A.modify_date as modifyDate," +
			"       A.opening_hours as openingHours," +
			"       A.place_lot as placeLot," +
			"       A.place_name as placeName," +
			"       A.place_street as placeStreet," +
			"       B.content as productContent," +
			"       B.description as productDescription," +
			"       B.event as productEvent," +
			"       A.product_id as productId," +
			"       A.tel as telephone" +
			"  FROM display_info as A" +
			" INNER JOIN product as B ON A.product_id = B.id" +
			" INNER JOIN category as C ON B.category_id = C.id" +
			" WHERE A.id = :displayInfoId";
	
	public static String CANCEL_RESERVATION = 
			"UPDATE reservation_info" +
			"   SET cancel_flag = 1" +
			" WHERE id = :reservationInfoId";
}