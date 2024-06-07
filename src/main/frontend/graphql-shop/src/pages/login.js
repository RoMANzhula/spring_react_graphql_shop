import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Stack, Alert, Select, MenuItem, InputLabel, FormControl } from "@mui/material";


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
    console.log("Callback hit");
    loginUser();
  }

const { onChange, onSubmit, values } = useForm(loginUserCallback, {
  email: '',
  password: ''
});

const [loginUser, { loading }] = useMutation(LOGIN_USER, {
  update(proxy, { data: { loginUser: userData } }) {
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
    {errors.map(function(error){
      return (
        <Alert severity="error" key={error.message}>
          {error.message}
        </Alert>
      );
    })}
  </Container>
)
}

export default Login;

