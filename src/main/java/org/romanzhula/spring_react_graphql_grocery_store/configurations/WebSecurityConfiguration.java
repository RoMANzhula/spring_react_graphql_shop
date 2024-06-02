package org.romanzhula.spring_react_graphql_grocery_store.configurations;

import org.romanzhula.spring_react_graphql_grocery_store.configurations.security.implementations.UserDetailServiceImpl;
import org.romanzhula.spring_react_graphql_grocery_store.configurations.security.jwt.components.AuthEntryPointJwt;
import org.romanzhula.spring_react_graphql_grocery_store.configurations.security.jwt.filters.AuthJwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfiguration {

    private final UserDetailServiceImpl userDetailServiceImpl;
    private final AuthEntryPointJwt authEntryPointJwtUnauthorizedHandler;

    public WebSecurityConfiguration(
            UserDetailServiceImpl userDetailServiceImpl,
            AuthEntryPointJwt authEntryPointJwtUnauthorizedHandler
    ) {
        this.userDetailServiceImpl = userDetailServiceImpl;
        this.authEntryPointJwtUnauthorizedHandler = authEntryPointJwtUnauthorizedHandler;
    }

    @Bean
    public AuthJwtFilter authJwtFilter() {
        return new AuthJwtFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(8);
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();

        daoAuthenticationProvider.setUserDetailsService(userDetailServiceImpl);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());

        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(authEntryPointJwtUnauthorizedHandler)
                )
                .authorizeHttpRequests(request -> request
                        .requestMatchers(toH2Console()).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .httpBasic(withDefaults())
                .authenticationProvider(daoAuthenticationProvider())
                .addFilterBefore(authJwtFilter(), UsernamePasswordAuthenticationFilter.class)
                .headers((headers) ->
                        headers
                                .frameOptions((frameOptions) -> frameOptions.disable())
                )
        ;

        return httpSecurity.build();
    }

}
