package com.backend.Security;

import com.backend.Entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;

@Service
public class JwtUtil {

    private static final int expireInMs = 10 * 60 * 1000; // 10 min

    private final static Key KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public static String generateJwtToken(User user) {
        HashMap<String, Object> extraData = new HashMap<>();
        extraData.put("username", user.getUsername());
        extraData.put("roles", user.getRoles());
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuer("backend.com.backend")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireInMs))
                .addClaims(extraData)
                .signWith(KEY)
                .compact();
    }
    public static boolean validateJwtToken(String token) {
        return (getEmail(token) != null && isExpired(token));
    }

    public static String getEmail(String token) {
        Claims claims = getClaims(token);
        return claims.getSubject();
    }

    public static boolean isExpired(String token) {
        Claims claims = getClaims(token);
        return claims.getExpiration().after(new Date(System.currentTimeMillis()));
    }

    public static Claims getClaims(String token) {
        return Jwts.parser().setSigningKey(KEY).parseClaimsJws(token).getBody();
    }

}