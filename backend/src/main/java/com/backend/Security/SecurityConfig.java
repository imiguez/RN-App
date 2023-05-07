package com.backend.Security;

import com.backend.Services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

import static com.backend.Security.CustomDSL.customDsl;

@Configuration @EnableWebSecurity @EnableGlobalMethodSecurity(
        securedEnabled = true, // Permits the @Secured() in the controllers
        jsr250Enabled = true, // Permits the @RolesAllowed() in the controllers
        prePostEnabled = true)
public class SecurityConfig {

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService())
                .passwordEncoder(getPassWordEncoder())
                .and().build();
    }
    @Bean
    public UserDetailsService userDetailsService() {
        return new UserService();
    }
    @Bean
    public BCryptPasswordEncoder getPassWordEncoder() {
        return new BCryptPasswordEncoder();
    }

/*    @Bean
    public BasicAuthenticationEntryPoint getBasicAuthenticationEntryPoint() {
        return new CustomAuthenticationEntryPoint();
    }*/

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        /*JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager(http));
        jwtAuthenticationFilter.setFilterProcessesUrl("/api/login");*/
        http
            .cors().and().csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeHttpRequests()
            .requestMatchers("/api/sign-up").permitAll()
            .requestMatchers("/api/login").permitAll()
            .anyRequest().authenticated();

        http.apply(customDsl());
        return http.build();
    }

}
