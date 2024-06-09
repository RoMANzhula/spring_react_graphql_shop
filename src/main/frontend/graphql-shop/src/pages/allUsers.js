import { useQuery } from "@apollo/client";
import gql from "graphql-tag";


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
    return (
      <p>Loading...</p>
    )
  }

  if (error) {
    return (
      <p>Error: {error.message}</p>
    )
  }

  return (
    <div>
      <h3>Users</h3>
      <ul>
        {data.getAllUsers.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName} - {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );

}

export default UsersList;
