import { AppBar, Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Call from './Call';
import SignInSignUp from './SignInSignUp';
import styles from "./Styles.module.scss";
import logo from "../../images/molla-logo.png"
import WishList from './WishList';
import CheckOut from './CheckOut';

const Navbar = () => {
  return (
    <AppBar position='relative' component="nav" sx={{ background: "#333333", padding: ".3rem 0"}}>
      <Container>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Call />
          <SignInSignUp />
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
