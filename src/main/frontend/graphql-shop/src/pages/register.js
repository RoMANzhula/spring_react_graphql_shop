import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Stack, Alert, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const REGISTER_USER = gql`
  mutation Mutation($input: UserInput) {
    registerUser(input: $input) {
      id
      firstName
      lastName
      email
      phoneNumber
      address
      city
      state
      zipCode
      role
    }
  }
`;

function Register(props) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    console.log("Callback hit");
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
    role: ''
  });

  const [registerUser, { loading } ] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { input: values }
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h4>Register</h4>
      <p>This is the register page, register to create an account:</p>
      <Stack spacing={2}>
        <TextField
          label="First Name"
          name="firstName"
          value={values.firstName}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Address"
          name="address"
          value={values.address}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="City"
          name="city"
          value={values.city}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="State"
          name="state"
          value={values.state}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Zip Code"
          name="zipCode"
          value={values.zipCode}
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
        <FormControl fullWidth>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            name="role"
            value={values.role}
            onChange={onChange}
          >
            <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
            <MenuItem value="ROLE_SELLER">Seller</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={onSubmit} fullWidth>Register</Button>
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

export default Register;
