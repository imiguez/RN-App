package com.backend.Security;

import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (!request.getServletPath().equals("/api/login")) {
            final String authorizationHeader = request.getHeader("Authorization");

            if (authorizationHeader != null && !authorizationHeader.isEmpty() && authorizationHeader.startsWith("Bearer")){
                final String token = authorizationHeader.split(" ")[1].trim();

                if (JwtUtil.validateJwtToken(token)) {
                    Claims claims = JwtUtil.getClaims(token);
                    String username = (String) claims.get("username");
                    List<String> roles = (List<String>) claims.get("roles");
                    Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
                    roles.forEach(role -> {
                        grantedAuthorities.add(new SimpleGrantedAuthority(role));
                    });
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, null, grantedAuthorities);
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    response.sendError(403, "403 Forbidden, you dont have permissions.");
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
