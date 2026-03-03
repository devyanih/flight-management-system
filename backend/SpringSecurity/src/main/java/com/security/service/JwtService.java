package com.security.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.security.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService
{
    @Value("${spring.app.jwtSecret}")
    private String secretKey;

    public String generateToken(User user)
    {
        Map<String,Object> claims = new HashMap<>();
        String role = user.getRole();
        if (role == null) {
            throw new IllegalArgumentException("User role is null — cannot generate JWT.");
        }
        claims.put("role",role.toUpperCase());
        return Jwts
                .builder()
                .claims().add(claims)
                .subject(user.getUserName())
                .issuer("Innovation")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000*60*60*3))
                .and()
                .signWith(generateKey())
                .compact();
    }

    public SecretKey generateKey(){
       byte arr[] = Decoders.BASE64.decode(secretKey);

       return Keys.hmacShaKeyFor(arr);
    }

    public String extractUsername(String jwtToken) {
        return extractClaims(jwtToken, Claims::getSubject);
    }

    private <T> T extractClaims(String jwtToken, Function<Claims, T> claimResolver) {
        Claims claims = extractClaims(jwtToken);
        return claimResolver.apply(claims);
    }

    private Claims extractClaims(String jwtToken) {
        return    Jwts.parser().verifyWith(generateKey()).build().parseSignedClaims(jwtToken).getPayload();
    }

    public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
        final  String username = extractUsername(jwtToken);

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken));
    }

    private boolean isTokenExpired(String jwtToken) {
        return extractExpiration(jwtToken).before(new Date());
    }

    private Date extractExpiration(String jwtToken)
    {
        return extractClaims(jwtToken, Claims::getExpiration);
    }
}

