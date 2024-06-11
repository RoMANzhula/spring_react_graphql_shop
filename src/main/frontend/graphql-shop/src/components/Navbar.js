import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { jwtDecode } from "jwt-decode";


function Navbar() {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate('/');
  }

  let userRole = null;

  if (user && localStorage.getItem("jwt")) {
    const token = localStorage.getItem("jwt");
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role.toString();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>Greeting</Link>
          </Typography>
          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {user ?
              <>
                {userRole === 'ROLE_ADMIN' && (
                  <>
                    <Link to="/admin/allUsers" style={{ textDecoration: "none", color: "white", margin: "17px" }}>
                      All Users
                    </Link>
                    <Link to="/admin/addUser" style={{ textDecoration: "none", color: "white", margin: "17px" }}>
                      Add User
                    </Link>
                  </>
                )}
                <Button style={{ textDecoration: "none", color: "white", margin: "17px" }} onClick={onLogout}>Logout</Button>
              </>
              :
              <>
                <Link to="/login" style={{ textDecoration: "none", color: "white", margin: "17px" }}>Login</Link>
                <Link to="/register" style={{ textDecoration: "none", color: "black" }}>Register</Link>
              </>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
