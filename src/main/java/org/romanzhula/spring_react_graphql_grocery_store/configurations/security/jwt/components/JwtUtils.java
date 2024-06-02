package org.romanzhula.spring_react_graphql_grocery_store.configurations.security.jwt.components;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.romanzhula.spring_react_graphql_grocery_store.configurations.security.implementations.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtils {

    @Value("${app.jwt_secret_code}")
    private String jwtSecretCode;

    @Value("${app.jwt_cookie_name}")
    private String jwtCookieName;


    public String getJwtFromCookies(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, jwtCookieName);

        return (cookie != null) ? cookie.getValue() : null;
    }

    public ResponseCookie generateJwtCookie(UserDetailsImpl userDetailsImpl) {
        int maxAgeTwoHour = 60 * 60 * 2;

        // here we get user email
        String jwt = generateTokenFromUserEmail(userDetailsImpl);

        return ResponseCookie
                .from(jwtCookieName, jwt)
                .path("/graphql")
                .maxAge(maxAgeTwoHour)
                .httpOnly(true)
                .build()
        ;
    }

    public String generateTokenFromUserEmail(UserDetailsImpl userDetailsImpl) {
        Instant issuedAt = LocalDateTime.now().toInstant(ZoneOffset.UTC);
        Instant expiration = issuedAt.plus(2, ChronoUnit.HOURS);

        return Jwts
                .builder()
                .subject(userDetailsImpl.getUsername())
                .issuedAt(Date.from(issuedAt))
                .expiration(Date.from(expiration))
                .signWith(key())
                .compact()
        ;
    }

    private SecretKey key() {
        return Keys.hmacShaKeyFor(jwtSecretCode.getBytes());
    }

    public ResponseCookie getCleanJwtCookie() {
        return ResponseCookie
                .from(jwtCookieName, null)
                .path("/graphql")
                .build()
        ;
    }

    public String getEmailFromJwtToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> function) {
        Claims claims = extractAllClaims(token);
        return function.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
        ;
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts
                    .parser()
                    .verifyWith(key())
                    .build()
                    .parse(authToken)
            ;

            return true;
        } catch (JwtException jwtException) {
            //change to a logger
            System.out.println("JWT Token validation ERROR: " + jwtException.getMessage());

            return false;
        }
    }

}
