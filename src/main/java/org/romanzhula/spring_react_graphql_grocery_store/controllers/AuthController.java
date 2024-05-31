package org.romanzhula.spring_react_graphql_grocery_store.controllers;

import org.romanzhula.spring_react_graphql_grocery_store.controllers.requests.LoginRequest;
import org.romanzhula.spring_react_graphql_grocery_store.controllers.responses.AuthResponse;
import org.romanzhula.spring_react_graphql_grocery_store.dto.UserInput;
import org.romanzhula.spring_react_graphql_grocery_store.models.User;
import org.romanzhula.spring_react_graphql_grocery_store.models.enums.Role;
import org.romanzhula.spring_react_graphql_grocery_store.repositories.UserRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthController(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    @MutationMapping
    public User registerUser(
            @Argument(name = "input") UserInput userInput
    ) {
        if (userRepository.existsByEmail(userInput.getEmail())) {
            throw new IllegalArgumentException("User with email: " + userInput.getEmail() + " already exists!");
        }

        if (userInput.getRole() != Role.ROLE_CUSTOMER && userInput.getRole() != Role.ROLE_SELLER) {
            throw new IllegalArgumentException("Only role CUSTOMER or SELLER can be registered!");
        }

        return this.userRepository.save(userInput.getUserEntity());
    }

    @MutationMapping
    public AuthResponse loginUser(
            @Argument LoginRequest loginRequest
    ) {
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

    @MutationMapping
    public String logoutUser() {
        SecurityContextHolder.clearContext();
        return "Successfully logged out!";
    }

}
