import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { VscArrowSmallRight } from 'react-icons/vsc';
import { FcGoogle } from "react-icons/fc"
import styles from './Styles.module.scss';
import { GetUserCart, GetUserWishList, LoginWithEmailAndPassword, signInWithGoogle } from '../Firebase';
import { Bars } from 'react-loader-spinner';
import { DataContext } from 'App';
import { handleFirebaseError, validateSignIn } from '../Handle';

const SignIn = () => {
  const {setSnackbar} = useContext(DataContext);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: ""
  });
  const [loginButton, setLoginButton] = useState({
    children: <>LOG IN <VscArrowSmallRight /></>,
    status: false
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({})

  const handleChange = (event) => {
    setInputValue(prevState => ({
      ...prevState,
      [event.target.id]: event.target.value
    }))
  };

  useEffect(() => {
    setErrors(validateSignIn(inputValue));
  }, [inputValue, touched]);

  const focusHandler = (event) => {
    setTouched({...touched, [event.target.id]: true})
  };

  const loginUser = async () => {
    if (!Object.keys(errors).length)  {
      try {
        setLoginButton({
          children: <Bars height="20" width="80" color="#fcb941" />,
          status: true
        })
        await LoginWithEmailAndPassword(inputValue);
        setSnackbar({
          ...handleFirebaseError("lgsc"),
          open: true,
        })
      } catch (error) {
        console.log(error)
        setLoginButton({
          children: <>LOG IN <VscArrowSmallRight /></>,
          status: false
        })
        setSnackbar({
          ...handleFirebaseError(error.code),
          open: true,
        })
      }
    } else {
      setTouched({
        email: true,
        password: true,
      })
    }
  }

  return (
    <Box>
      <div className={styles.inputs} style={{marginBottom: "13px"}}>
        <div>
          <label htmlFor="email">Email Address *</label>
          {errors.email && touched.email && <p>{errors.email}</p>}
        </div>
        <input defaultValue={inputValue.email} onChange={handleChange} onFocus={focusHandler} type="email" id="email"/>
      </div>
      <div className={styles.inputs} style={{marginBottom: "13px"}}>
        <div>
          <label htmlFor="password">Password *</label>
          {errors.password && touched.password && <p>{errors.password}</p>}
        </div>
        <input defaultValue={inputValue.password} onChange={handleChange} onFocus={focusHandler} type="password" id="password"/>
        {errors.password && touched.password && <p>{errors.password}</p>}
      </div>
      <div className={styles.login}>
      <button disabled={loginButton.status} className={loginButton.status? styles.none: ""} onClick={loginUser}>{loginButton.children}</button>
      </div>
      <hr style={{margin: "2rem 0"}} />
      <div className={styles.bottom}>
        <p>or sign in with</p>
        <button onClick={() => signInWithGoogle(setSnackbar)}><FcGoogle /> Login With Google</button>
      </div>
    </Box>
  );
}

export default SignIn;
