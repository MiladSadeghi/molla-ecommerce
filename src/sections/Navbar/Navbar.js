import { AppBar, Container } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Call from './Call';
import SignInSignUp from './SignInSignUp';
import styles from "./Styles.module.scss";
import logo from "../../images/molla-logo.png"
import WishList from './WishList';
import CheckOut from './CheckOut';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../components/Firebase';

const Navbar = () => {
  const [userDetails, setUserDetails] = useState({
    logged: false,
    userName: ""
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDetails({
          logged: true,
          userName: user.displayName,
        })
      }
    });
  }, []);
  return (
    <AppBar position='relative' component="nav" sx={{ background: "#333333"}}>
      <Container>
        <Box display={"flex"} justifyContent={"space-between"} py={"8.5px"}>
          <Call />
          {
            userDetails.logged ? <h5 className={styles.username}>{userDetails.userName}</h5> : <SignInSignUp />
          }
        </Box>
        <hr className={styles.hr} />
        <Box display={"flex"} justifyContent={"space-between"} margin={"2rem 0"}>
          <Box component={"img"} src={logo} alt="logo" />
          <Box component={"div"} sx={{display: "flex"}}>
            <WishList />
            <CheckOut /> 
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}

export default Navbar;
