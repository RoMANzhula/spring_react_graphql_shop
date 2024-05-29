package org.romanzhula.spring_react_graphql_grocery_store.repositories;

import org.romanzhula.spring_react_graphql_grocery_store.models.User;
import org.romanzhula.spring_react_graphql_grocery_store.models.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserById(Long id);

    User findUserByEmail(String email);

    Iterable<User> findUsersByRole(Role role);

    boolean existsByEmail(String email);
}
