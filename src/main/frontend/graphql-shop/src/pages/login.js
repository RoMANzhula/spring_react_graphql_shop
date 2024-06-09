import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";

const LOGIN_USER = gql`
  mutation LoginUser($loginRequest: LoginRequest!) {
    loginUser(loginRequest: $loginRequest) {
      jwt
      jwtCookie
      message
    }
  }
`;

function Login(props) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {

      const cookieString = userData.jwtCookie;
      document.cookie = cookieString;

      const jwtCookieValue = userData.jwtCookie.split(';')[0];
      localStorage.setItem("jwt", userData.jwt);
      localStorage.setItem("jwtCookie", jwtCookieValue);

      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginRequest: values }
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h4>Login</h4>
      <p>Please login to your account:</p>
      <Stack spacing={2}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          fullWidth
        />
        <Button variant="contained" onClick={onSubmit} fullWidth>Login</Button>
      </Stack>
      {errors.map(error => (
        <Alert severity="error" key={error.message}>
          {error.message}
        </Alert>
      ))}
    </Container>
  )
}

export default Login;

