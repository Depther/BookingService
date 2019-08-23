package me.depther.repository;

public class DownloadSqls {

	public static String SELECT_IMAGE = 
			"SELECT id as fileId," +
			"       file_name as fileName," +
			"       save_file_name as saveFileName," +
			"       content_type as contentType," +
			"       delete_flag as deleteFlag," +
			"       create_date as createDate," +
			"       modify_date as modifyDate" +
			"  FROM file_info" +
			" WHERE id = :fileId";

}
