import React, { useState } from 'react';
import { useQuery, useLazyQuery } from "@apollo/client";
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

const GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
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

const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
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

const GET_USERS_BY_ROLE = gql`
  query getUsersByRole($role: Role!, $limit: Int!, $offset: Int!) {
    getUsersByRole(role: $role, limit: $limit, offset: $offset) {
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
  const [searchId, setSearchId] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchRole, setSearchRole] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS, {
    variables: { limit: usersPerPage, offset: (currentPage - 1) * usersPerPage }
  });

  const [getUserById, { data: userByIdData }] = useLazyQuery(GET_USER_BY_ID);
  const [getUserByEmail, { data: userByEmailData }] = useLazyQuery(GET_USER_BY_EMAIL);
  const [getUsersByRole, { data: usersByRoleData }] = useLazyQuery(GET_USERS_BY_ROLE);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleSearchById = () => {
    getUserById({ variables: { id: searchId } });
  };

  const handleSearchByEmail = () => {
    getUserByEmail({ variables: { email: searchEmail } });
  };

  const handleSearchByRole = () => {
    getUsersByRole({ variables: { role: searchRole, limit: usersPerPage, offset: (currentPage - 1) * usersPerPage } });
  };

  const handleResetFilters = () => {
    setSearchId("");
    setSearchEmail("");
    setSearchRole("");
    setUsersPerPage(10);
    setCurrentPage(1);
    setCustomPerPage(10);
    
    refetch({ limit: 10, offset: 0 });
    window.location.reload();
  };

  const users = userByIdData?.getUserById ? [userByIdData.getUserById]
                : userByEmailData?.getUserByEmail ? [userByEmailData.getUserByEmail]
                : usersByRoleData?.getUsersByRole?.users || data.getAllUsers.users;

  const totalUsers = usersByRoleData?.getUsersByRole?.totalUsers || data.getAllUsers.totalUsers;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

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

        <label style={{ marginRight: '2px', marginLeft: '15px' }}>Custom Users Per Page: </label>
        <input type="number" value={customPerPage} onChange={(e) => setCustomPerPage(parseInt(e.target.value))} size="3" />
        <button onClick={() => setUsersPerPage(customPerPage)}>Set</button>

        <div className="search-container">
          <label>Search by ID: </label>
          <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
          <button onClick={handleSearchById}>Search</button>

          <label style={{ marginLeft: '15px' }}>Search by Email: </label>
          <input type="text" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
          <button onClick={handleSearchByEmail}>Search</button>

          <label style={{ marginLeft: '15px' }}>Filter by Role: </label>
          <select value={searchRole} onChange={(e) => setSearchRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="ROLE_SELLER">ROLE_SELLER</option>
            <option value="ROLE_CUSTOMER">ROLE_CUSTOMER</option>
          </select>
          <button onClick={handleSearchByRole}>Filter</button>
        </div>

        <button style={{ marginLeft: '15px' }} onClick={handleResetFilters}>Reset Filters</button>
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
          {users.map(user => (
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







/* import React, { useState } from 'react';
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
 */