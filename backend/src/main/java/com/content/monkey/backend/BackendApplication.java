package com.content.monkey.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.env.Environment;


@SpringBootApplication
public class BackendApplication {
	@Autowired
	private Environment env;
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	@Primary
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.additionalInterceptors((request, body, execution) -> {
			request.getHeaders().add("User-Agent", "Sui"); // Customize your user-agent here
			return execution.execute(request, body);
		}).build();
	}

}
