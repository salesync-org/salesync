package org.salesync.record_service.configurations;

import lombok.RequiredArgsConstructor;
import org.salesync.record_service.components.ExceptionHandler;
import org.salesync.record_service.components.TokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class HttpConfig {
    private final TokenFilter tokenFilter;
    private final ExceptionHandler exceptionHandler;

    @Bean
    public List<RequestMatcher> permitAllRequestMatchers() {
        List<RequestMatcher> permitAllMatchers = new ArrayList<>();

        permitAllMatchers.add(new AntPathRequestMatcher("/swagger-ui/**"));
        permitAllMatchers.add(new AntPathRequestMatcher("/api-docs/**"));
        return permitAllMatchers;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(AbstractHttpConfigurer::disable).csrf(AbstractHttpConfigurer::disable).httpBasic(Customizer.withDefaults()).authorizeHttpRequests(auth -> auth.requestMatchers(permitAllRequestMatchers().toArray(new RequestMatcher[0])).permitAll().anyRequest().authenticated()).exceptionHandling(exceptions -> exceptions.authenticationEntryPoint(exceptionHandler)).sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).addFilterBefore(tokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
