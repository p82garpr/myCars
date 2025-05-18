package com.example.MyCars.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI myOpenAPI() {
        Server devServer = new Server()
            .url("http://localhost:8080")
            .description("Servidor de desarrollo");

        Contact contact = new Contact()
            .name("MyCars API Support")
            .email("support@mycars.com");

        Info info = new Info()
            .title("MyCars API")
            .version("1.0")
            .contact(contact)
            .description("API para gestión de vehículos")
            .license(new License().name("Apache 2.0").url("http://springdoc.org"));

        return new OpenAPI()
            .info(info)
            .servers(List.of(devServer));
    }
} 