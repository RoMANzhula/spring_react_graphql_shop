package org.romanzhula.spring_react_graphql_grocery_store.controllers;

import org.romanzhula.spring_react_graphql_grocery_store.controllers.requests.LoginRequest;
import org.romanzhula.spring_react_graphql_grocery_store.controllers.responses.AuthResponse;
import org.romanzhula.spring_react_graphql_grocery_store.dto.UserInput;
import org.romanzhula.spring_react_graphql_grocery_store.models.User;
import org.romanzhula.spring_react_graphql_grocery_store.services.AuthService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @MutationMapping
    public User registerUser(
            @Argument(name = "input") UserInput userInput
    ) {
        return authService.registrationUser(userInput);
    }

    @MutationMapping
    public AuthResponse loginUser(
            @Argument LoginRequest loginRequest
    ) {
        return authService.authenticateUser(loginRequest);
    }

    @MutationMapping
    public String logoutUser() {
        return authService.logoutUser();
    }

}
