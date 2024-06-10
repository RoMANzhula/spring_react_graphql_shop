import React from 'react';
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import './AllUsers.css';

const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
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

function UsersList() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h3>Users</h3>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.getAllUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.address}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.zipCode}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
