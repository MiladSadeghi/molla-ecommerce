import { AppBar, Container, Box } from '@mui/material';
import React, { useEffect, useState, createContext, useContext } from 'react';
import Call from './Call';
import SignInSignUp from './SignInSignUp';
import styles from "./Styles.module.scss";
import logo from "images/molla-logo.png"
import WishList from './WishList';
import CheckOut from './CheckOut';
import { auth } from '../Firebase';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <AppBar position='relative' component="nav" sx={{ background: "#333333"}}>
      <Container>
        <Box display={"flex"} justifyContent={"space-between"} py={"8.5px"}>
          <Call />
          {
            (auth.currentUser && !auth.currentUser.isAnonymous) ?
            <h5 className={styles.username}>{auth.currentUser.displayName}</h5> : 
            <SignInSignUp />
          }
        </Box>
        <hr className={styles.hr} />
        <Box display={"flex"} justifyContent={"space-between"} margin={"2rem 0"}>
          <Link to={'/'}>
            <Box component={"img"} src={logo} alt="logo" />
          </Link>
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
