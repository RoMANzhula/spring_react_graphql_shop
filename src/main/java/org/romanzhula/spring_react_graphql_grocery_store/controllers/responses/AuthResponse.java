package org.romanzhula.spring_react_graphql_grocery_store.controllers.responses;

import org.springframework.http.ResponseCookie;

public class AuthResponse {

    private String jwt;

    private ResponseCookie cookie;

    private String message;


    public AuthResponse(String jwt, ResponseCookie cookie, String message) {
        this.jwt = jwt;
        this.cookie = cookie;
        this.message = message;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public ResponseCookie getCookie() {
        return cookie;
    }

    public void setCookie(ResponseCookie cookie) {
        this.cookie = cookie;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
