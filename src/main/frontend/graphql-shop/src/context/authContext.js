import React, { useReducer, createContext } from "react";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null
};

const cookieString = localStorage.getItem("jwtCookie");

if (cookieString) {
  const decodedToken = jwtDecode(cookieString);
  if (decodedToken.exp * 1000 < Date.now()) {
    document.cookie = "jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
});

function authReducer(state, action) {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    document.cookie = `${localStorage.getItem("jwtCookie")}; path=/;`;
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  };

  function logout() {
    document.cookie = "jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch({
      type: 'LOGOUT'
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };

