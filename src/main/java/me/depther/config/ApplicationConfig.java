package me.depther.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({DatabaseConfig.class})
@ComponentScan(basePackages = {"me.depther.service", "me.depther.repository"})
public class ApplicationConfig {
}
