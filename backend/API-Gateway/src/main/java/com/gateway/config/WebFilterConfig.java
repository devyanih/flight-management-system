package com.gateway.config;

import com.gateway.filter.JwtAuthenticationFilter;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.server.WebFilter;

import javax.crypto.SecretKey;

@Configuration
public class WebFilterConfig implements WebFluxConfigurer {

    private static final String SECRET_KEY = "mySecretKey123yaghsdhgyuynznhjashasasyuyuyyuwuyq8787721s212xjhhd912738";


    @Bean
    public WebFilter additionalFilter() {
        return (exchange, chain) -> {
            // Add custom filter logic here
            return chain.filter(exchange);
        };
    }

//    @Bean
//    public ReactiveJwtDecoder reactiveJwtDecoder() {
//        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
//        SecretKey secretKey = Keys.hmacShaKeyFor(keyBytes);
//        return NimbusReactiveJwtDecoder.withSecretKey(secretKey).build();
//    }
}