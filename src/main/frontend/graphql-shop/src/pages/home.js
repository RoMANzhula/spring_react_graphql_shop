import { useContext } from "react";
import { AuthContext } from "../context/authContext";


function Homepage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <h2>It is our HomePage</h2>
      { user?
        <>
          <h3>{user.message} - for logged in!</h3>
        </>
      :
        <>
          <p>User data is empty!</p>
        </>
      }
    </>
  )
}

export default Homepage;
