package org.romanzhula.spring_react_graphql_grocery_store.controllers.responses;

public class AuthResponse {

    private String jwt;

    private String jwtCookie;

    private String message;


    public AuthResponse(String jwt, String jwtCookie, String message) {
        this.jwt = jwt;
        this.jwtCookie = jwtCookie;
        this.message = message;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getJwtCookie() {
        return jwtCookie;
    }

    public void setJwtCookie(String jwtCookie) {
        this.jwtCookie = jwtCookie;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
