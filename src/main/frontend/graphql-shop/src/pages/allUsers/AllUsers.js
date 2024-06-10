import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import './AllUsers.css';


const GET_ALL_USERS = gql`
  query getAllUsers($limit: Int!, $offset: Int!) {
    getAllUsers(limit: $limit, offset: $offset) {
      users {
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
      totalUsers
    }
  }
`;

function UsersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    variables: { limit: usersPerPage, offset: (currentPage - 1) * usersPerPage }
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const totalPages = Math.ceil(data.getAllUsers.totalUsers / usersPerPage);

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
          {data.getAllUsers.users.map(user => (
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
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UsersList;
