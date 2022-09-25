package com.backend.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || authorizationHeader.isEmpty() || !authorizationHeader.startsWith("Bearer")){
            // if Authorization header does not exist, then skip this filter
            // and continue to execute next filter class
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authorizationHeader.split(" ")[1].trim();
        if (!jwtUtil.validate(token)) {
            // if token is not valid, then skip this filter
            // and continue to execute next filter class.
            // This means authentication is not successful since token is invalid.
            filterChain.doFilter(request, response);
            return;
        }

        // Authorization header exists, token is valid. So, we can authenticate.
        String username = jwtUtil.getUsername(token);
        // initializing UsernamePasswordAuthenticationToken with its 3 parameter constructor
        // because it sets super.setAuthenticated(true); in that constructor.
        UsernamePasswordAuthenticationToken upassToken = new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
        upassToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        // finally, give the authentication token to Spring Security Context
        SecurityContextHolder.getContext().setAuthentication(upassToken);

        // end of the method, so go for next filter class
        filterChain.doFilter(request, response);
    }
}
