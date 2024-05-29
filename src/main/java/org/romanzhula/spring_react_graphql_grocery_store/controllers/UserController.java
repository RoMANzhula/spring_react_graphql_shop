package org.romanzhula.spring_react_graphql_grocery_store.controllers;

import org.romanzhula.spring_react_graphql_grocery_store.dto.UserInput;
import org.romanzhula.spring_react_graphql_grocery_store.models.User;
import org.romanzhula.spring_react_graphql_grocery_store.models.enums.Role;
import org.romanzhula.spring_react_graphql_grocery_store.repositories.UserRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @QueryMapping
    public Iterable<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @QueryMapping
    public User getUserById(
            @Argument Long id
    ) {
        return this.userRepository.findUserById(id).orElseThrow();
    }

    @QueryMapping
    public User getUserByEmail(
            @Argument String email
    ) {
        return this.userRepository.findUserByEmail(email);
    }

    @QueryMapping
    public Iterable<User> getUsersByRole(
            @Argument Role role
    ) {
        return this.userRepository.findUsersByRole(role);
    }

    @MutationMapping
    public User addUser(
            @Argument(name = "input") UserInput userInput
    ) {
        if (userRepository.existsByEmail(userInput.getEmail())) {
            throw new IllegalArgumentException("User with email: " + userInput.getEmail() + "already exists!");
        }

        return this.userRepository.save(userInput.getUserEntity());
    }

}
