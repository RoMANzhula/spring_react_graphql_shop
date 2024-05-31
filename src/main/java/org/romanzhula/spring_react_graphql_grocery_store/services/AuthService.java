package org.romanzhula.spring_react_graphql_grocery_store.services;

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
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtUtils jwtUtils,
            PasswordEncoder passwordEncoder,
            UserRepository userRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
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

        String jwt = jwtUtils.generateTokenFromUsername(userDetails);
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        return new AuthResponse(
                jwt,
                jwtCookie,
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

        return this.userRepository.save(userInput.getUserEntity());
    }


    public String logoutUser() {
        SecurityContextHolder.clearContext();
        return "Successfully logged out!";
    }
}