package com.tailor.TailorService.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disables CSRF (optional)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/tailors","/tailors/**", "tailors/register", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll() // Allow public access to login and register pages
                        .anyRequest().authenticated() // Protect other endpoints
                )
//                .formLogin(form -> form
//                        .loginPage("/login") // Specifies the custom login page
//                        .permitAll() // Allows everyone to access the login page
//                        .defaultSuccessUrl("/home", true) // Redirect after successful login
//                        .failureUrl("/login?error=true") // Redirect on failed login
//                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // Logout URL
                        .logoutSuccessUrl("/login?logout=true") // Redirect after successful logout
                );
        return http.build();
    }
}
