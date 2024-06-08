import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";


function Navbar() {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate('/');
  }

  console.log(user);

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div">
            <Link to="/" style={{textDecoration: "none", color: "black"}}>Greeting</Link>
          </Typography>
          <Box alignItems="right" sx={{flexGrow: 1, textAlign: "right"}}>
            { user ?
              <>
                <Button style={{textDecoration: "none", color: "white", margin: "17px"}} onClick={onLogout}>Logout</Button>
              </>
            :
              <>
                <Link to="/login" style={{textDecoration: "none", color: "white", margin: "17px"}}>Login</Link>
                <Link to="/register" style={{textDecoration: "none", color: "black"}}>Register</Link>
              </>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
