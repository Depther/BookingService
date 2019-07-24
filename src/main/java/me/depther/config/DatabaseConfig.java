package me.depther.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
public class DatabaseConfig implements TransactionManagementConfigurer {

	@Autowired
	private HikariConfig hikariConfig;

	@Bean
	public DataSource dataSource() {
		return new HikariDataSource(hikariConfig);
	}

	@Override
	public PlatformTransactionManager annotationDrivenTransactionManager() {
		return transactionManager();
	}

	@Bean
	public PlatformTransactionManager transactionManager() {
		return new DataSourceTransactionManager(dataSource());
	}

	@Bean
	public NamedParameterJdbcTemplate jdbcTemplate() {
		return new NamedParameterJdbcTemplate(dataSource());
	}


	@Configuration
	@Profile("dev")
	@PropertySource("classpath:/application.properties")
	public static class DevConfig {

		@Autowired
		private Environment environment;

		@Bean
		public HikariConfig hikariConfig() {
			HikariConfig hikariConfig = new HikariConfig();
			hikariConfig.setDriverClassName(environment.getProperty("dev.spring.datasource.driver-class-name"));
			hikariConfig.setJdbcUrl(environment.getProperty("dev.spring.datasource.url"));
			hikariConfig.setUsername(environment.getProperty("dev.spring.datasource.username"));
			hikariConfig.setPassword(environment.getProperty("dev.spring.datasource.password"));
			return hikariConfig;
		}

	}

	@Configuration
	@Profile("real")
	@PropertySource("classpath:/application.properties")
	public static class RealConfig {

		@Autowired
		private Environment environment;

		@Bean
		public HikariConfig hikariConfig() {
			HikariConfig hikariConfig = new HikariConfig();
			hikariConfig.setDriverClassName(environment.getProperty("real.spring.datasource.driver-class-name"));
			hikariConfig.setJdbcUrl(environment.getProperty("real.spring.datasource.url"));
			hikariConfig.setUsername(environment.getProperty("real.spring.datasource.username"));
			hikariConfig.setPassword(environment.getProperty("real.spring.datasource.password"));
			return hikariConfig;
		}

	}

}
