package me.depther.util;

import javax.servlet.http.HttpServletRequest;

public class IPUtil {

	public static String getIp(HttpServletRequest request) {
		String clientIp = request.getHeader("X-Forwarded-For");
		if (clientIp == null) {
			clientIp = request.getHeader("Proxy-Client-IP");
		}
		if (clientIp == null) {
			clientIp = request.getHeader("WL-Proxy-Client-IP");
		}
		if (clientIp == null) {
			clientIp = request.getHeader("HTTP_CLIENT_IP");
		}
		if (clientIp == null) {
			clientIp = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (clientIp == null) {
			clientIp = request.getRemoteAddr();
		}
		return clientIp;
	}

}
