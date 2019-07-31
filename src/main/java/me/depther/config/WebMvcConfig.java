package me.depther.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"me.depther.controller", "me.depther.exception"})
public class WebMvcConfig implements WebMvcConfigurer {

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}

	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		registry.jsp("/WEB-INF/views/", ".html");
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("main");
		registry.addViewController("/detail").setViewName("detail");
		registry.addViewController("/review").setViewName("review");
		registry.addViewController("/myReservation").setViewName("myReservation");
		registry.addViewController("/reserve").setViewName("reserve");
		registry.addViewController("/bookinglogin").setViewName("bookinglogin");
	}

}

