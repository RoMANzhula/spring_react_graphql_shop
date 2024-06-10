package org.romanzhula.spring_react_graphql_grocery_store.controllers;

import org.romanzhula.spring_react_graphql_grocery_store.controllers.responses.UserPage;
import org.romanzhula.spring_react_graphql_grocery_store.dto.UserInput;
import org.romanzhula.spring_react_graphql_grocery_store.models.User;
import org.romanzhula.spring_react_graphql_grocery_store.models.enums.Role;
import org.romanzhula.spring_react_graphql_grocery_store.repositories.UserRepository;
import org.romanzhula.spring_react_graphql_grocery_store.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public UserController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            UserService userService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @QueryMapping
    public UserPage getAllUsers(@Argument int limit, @Argument int offset) {
        return userService.getAllUsers(limit, offset);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @QueryMapping
    public User getUserById(
            @Argument Long id
    ) {
        return this.userRepository.findUserById(id).orElseThrow();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @QueryMapping
    public User getUserByEmail(
            @Argument String email
    ) {
        return this.userRepository.findUserByEmail(email).orElseThrow();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @QueryMapping
    public Iterable<User> getUsersByRole(
            @Argument Role role
    ) {
        return this.userRepository.findUsersByRole(role);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @MutationMapping
    public User addUser(
            @Argument(name = "input") UserInput userInput
    ) {
        if (userRepository.existsByEmail(userInput.getEmail())) {
            throw new IllegalArgumentException("User with email: " + userInput.getEmail() + "already exists!");
        }

        return this.userRepository.save(userInput.getUserEntity(passwordEncoder));
    }

}
