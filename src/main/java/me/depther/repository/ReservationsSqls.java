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

	public static String SELECT_RESERVATION_INFO = 
			"SELECT id as reservationInfoId," +
			"       CASE when cancel_flag = 0 then 'false'" +
			"            when cancel_flag = 1 then 'true' " +
			"        END as cancleYn," +
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
	
}
