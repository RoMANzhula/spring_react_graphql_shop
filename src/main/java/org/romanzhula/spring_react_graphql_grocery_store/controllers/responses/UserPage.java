package org.romanzhula.spring_react_graphql_grocery_store.controllers.responses;

import org.romanzhula.spring_react_graphql_grocery_store.models.User;

import java.util.List;

public class UserPage {

    private List<User> users;
    private int totalUsers;

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public int getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(int totalUsers) {
        this.totalUsers = totalUsers;
    }
}
