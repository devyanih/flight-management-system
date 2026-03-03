package com.gateway.config;

import com.gateway.filter.JwtAuthenticationFilter;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // ✅ Correct HttpMethod import
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        System.out.println("Enter in SecurityWebFilterChain");

        return http.authorizeExchange(exchange -> exchange
//                        .pathMatchers("/UserManagement/register",
//                                      "/UserManagement/users",
//                                      "/UserManagement/login").permitAll()
        				.pathMatchers("/SpringSecurity/**").permitAll()
                        .pathMatchers(HttpMethod.POST, "/api/fares/**").hasRole("OWNER")
                        .pathMatchers(HttpMethod.GET, "/api/fares/**").hasAnyRole("USER", "OWNER")//                        .pathMatchers(HttpMethod.POST, "/flights").hasRole("OWNER")
                        .pathMatchers(HttpMethod.POST, "/flights/**").hasRole("OWNER")
                        .pathMatchers(HttpMethod.GET, "/flights/**").hasAnyRole("USER", "OWNER")
                        .pathMatchers(HttpMethod.PUT, "/api/fares/**").hasRole("OWNER")
                        .pathMatchers(HttpMethod.DELETE, "/api/fares/**").hasRole("OWNER")
                        .pathMatchers(HttpMethod.GET, "/api/fares/**").hasAnyRole("USER", "OWNER")
                        .pathMatchers(HttpMethod.POST, "/flights/**").hasRole("OWNER")
                        .pathMatchers(HttpMethod.PUT, "/flights/**").hasRole("OWNER")
                        .pathMatchers(HttpMethod.DELETE, "/flights/**").hasRole("OWNER")
                        .pathMatchers(HttpMethod.GET, "/flights/**").hasAnyRole("USER", "OWNER")
                        .pathMatchers("/bookings/user/**").hasRole("USER")
                        .pathMatchers(HttpMethod.DELETE, "/bookings/cancel/**").hasRole("USER")
                        .pathMatchers("/bookings/all").hasAnyRole("OWNER","USER")
                        .pathMatchers("/bookings/**").hasRole("USER")
		                .pathMatchers("/checkin/**").hasRole("USER")
                       
                        .anyExchange().denyAll())
                .addFilterAt(jwtAuthenticationFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                .csrf(csrfSpec -> csrfSpec.disable())
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                .cors(corsSpec -> corsSpec.configurationSource(corsConfigurationSource()))
                .build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/**", config);
        return src;
    }
    
}
