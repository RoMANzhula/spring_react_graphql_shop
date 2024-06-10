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
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [customPerPage, setCustomPerPage] = useState(10);

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
      <div className="container">
        <h3 className="center">Users</h3>

        <label style={{ marginRight: '2px' }}>Users Per Page: </label>
        <select value={usersPerPage} onChange={(e) => setUsersPerPage(parseInt(e.target.value))}>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={7}>7</option>
        </select>
      
        <label style={{ marginRight: '2px', marginLeft: '30px' }}>Custom Users Per Page: </label>
        <input type="text" value={customPerPage} onChange={(e) => setCustomPerPage(parseInt(e.target.value))} size="1" />
        <button onClick={() => setUsersPerPage(customPerPage)}>Set</button>
      </div>
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
        <div className='container'>
          <button
            style={{ marginRight: '2px' }}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            style={{ marginLeft: '2px' }}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
