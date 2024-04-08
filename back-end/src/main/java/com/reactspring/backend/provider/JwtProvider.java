package com.reactspring.backend.provider;


import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;


@Component
public class JwtProvider {
  
  private SecretKey secretKey;

  public JwtProvider(@Value("${secret-key}") String secretKey) {

    this.secretKey = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());

  }

  public String validate(String token) {

    Claims claims = null;

    try {
      claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
    } catch (Exception exception) {
      exception.printStackTrace();
      return null;
    }

    return claims.getSubject();

  }

  public String getUserName(String token) {

    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("userName", String.class);

  }

  public String getRole(String token) {

    return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);

  }

  public String createJwt(String email, String userName, String role) {

    Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

    return Jwts.builder()
      .subject(email)
      .claim("userName", userName)
      .claim("role", role)
      .issuedAt(new Date(System.currentTimeMillis()))
      .expiration(expiredDate)
      .signWith(secretKey)
      .compact();

  }

}
