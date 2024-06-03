package org.romanzhula.spring_react_graphql_grocery_store.services;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.romanzhula.spring_react_graphql_grocery_store.configurations.security.implementations.UserDetailsImpl;
import org.romanzhula.spring_react_graphql_grocery_store.configurations.security.jwt.components.JwtUtils;
import org.romanzhula.spring_react_graphql_grocery_store.controllers.requests.LoginRequest;
import org.romanzhula.spring_react_graphql_grocery_store.controllers.responses.AuthResponse;
import org.romanzhula.spring_react_graphql_grocery_store.dto.UserInput;
import org.romanzhula.spring_react_graphql_grocery_store.models.User;
import org.romanzhula.spring_react_graphql_grocery_store.models.enums.Role;
import org.romanzhula.spring_react_graphql_grocery_store.repositories.UserRepository;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtUtils jwtUtils,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String jwt = jwtUtils.generateTokenFromUserEmail(userDetails);
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        return new AuthResponse(
                jwt,
                jwtCookie.toString(),
                "User authenticated successfully!"
        );
    }

    public User registrationUser(UserInput userInput) {
        if (userRepository.existsByEmail(userInput.getEmail())) {
            throw new IllegalArgumentException("User with email: " + userInput.getEmail() + " already exists!");
        }

        if (userInput.getRole() != Role.ROLE_CUSTOMER && userInput.getRole() != Role.ROLE_SELLER) {
            throw new IllegalArgumentException("Only role CUSTOMER or SELLER can be registered!");
        }

        return this.userRepository.save(userInput.getUserEntity(passwordEncoder));
    }


    public String logoutUser() {
//        SecurityContextHolder.clearContext();
//        jwtUtils.getCleanJwtCookie();
//
//        return "Successfully logged out!";

        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            HttpServletRequest request = attributes.getRequest();
            HttpServletResponse response = attributes.getResponse();
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            if (auth != null) {
                new SecurityContextLogoutHandler().logout(request, response, auth);
                jwtUtils.getCleanJwtCookie();
                return "Logout successful";
            } else {
                return "Not authenticated";
            }

        } catch (Exception e) {
            return "Internal Server Error";
        }
    }
}
