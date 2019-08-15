package me.depther.intercepter;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@Component
public class SessionCheckIntercepter implements HandlerInterceptor {

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		Optional.ofNullable(request.getSession())
				.map(session -> (String)session.getAttribute("email"))
				.ifPresent(email -> modelAndView.addObject("email", email));
	}
}
