import { AppBar, Container, Snackbar, Box, Fade } from '@mui/material';
import React, { useEffect, useState, createContext, useContext } from 'react';
import Call from './Call';
import SignInSignUp from './SignInSignUp';
import styles from "./Styles.module.scss";
import logo from "images/molla-logo.png"
import WishList from './WishList';
import CheckOut from './CheckOut';
import { AnonymouslySignIn, auth, GetUserWishList } from '../Firebase';
import MuiAlert from '@mui/material/Alert';
import { onAuthStateChanged } from 'firebase/auth';
import { DataContext } from 'App';
import { Link } from 'react-router-dom';

export const Context = createContext();
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
  const data = useContext(DataContext);
  const [userDetails, setUserDetails] = useState({
    logged: false,
    userName: ""
  });
  const [snackbar, setSnackbar] = useState({
    message: "",
    open: false,
    severity: ""
  })
  const [useAuth] = useState(auth);

  useEffect(() => {
    if (useAuth.currentUser) {
      setUserDetails({
        logged: true,
        userName: useAuth.currentUser.displayName
      })
    }
  }, [useAuth.currentUser, useAuth]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        data[5](await GetUserWishList());
      } else {
        AnonymouslySignIn();
      }
    })
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({...snackbar, open: !snackbar.open});
  };

  return (
    <AppBar position='relative' component="nav" sx={{ background: "#333333"}}>
      <Container>
        <Box display={"flex"} justifyContent={"space-between"} py={"8.5px"}>
          <Call />
          {
            (userDetails.logged && userDetails.userName !== null) ?
            <h5 className={styles.username}>{userDetails.userName}</h5> : 
            <Context.Provider value={{snackbar, setSnackbar}}>
              <SignInSignUp />
            </Context.Provider>
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
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose} TransitionComponent={Fade}>
          <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
