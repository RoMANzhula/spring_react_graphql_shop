package org.romanzhula.spring_react_graphql_grocery_store.services;

import org.romanzhula.spring_react_graphql_grocery_store.controllers.responses.UserPage;
import org.romanzhula.spring_react_graphql_grocery_store.models.User;
import org.romanzhula.spring_react_graphql_grocery_store.models.enums.Role;
import org.romanzhula.spring_react_graphql_grocery_store.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserPage getAllUsers(int limit, int offset) {
        Pageable pageable = PageRequest.of(offset / limit, limit);
        Page<User> userPage = userRepository.findAll(pageable);

        UserPage result = new UserPage();
        result.setUsers(userPage.hasContent() ? userPage.getContent() : new ArrayList<>());
        result.setTotalUsers((int) userPage.getTotalElements());
        return result;
    }

    @Transactional(readOnly = true)
    public User getUserById(Long id) {
        return userRepository.findUserById(id).orElseThrow();
    }

    @Transactional(readOnly = true)
    public UserPage getUsersByRole(Role role, int limit, int offset) {
        Pageable pageable = PageRequest.of(offset / limit, limit);
        Page<User> userPage = userRepository.findByRole(role, pageable);

        UserPage result = new UserPage();
        result.setUsers(userPage.hasContent() ? userPage.getContent() : new ArrayList<>());
        result.setTotalUsers((int) userPage.getTotalElements());
        return result;
    }

}
