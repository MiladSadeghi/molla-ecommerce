import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { VscArrowSmallRight } from 'react-icons/vsc';
import { FcGoogle } from "react-icons/fc"
import styles from './Styles.module.scss';
import { signInWithGoogle } from '../../components/Firebase';

const SignIn = () => {
  const [inputValue, setInputValue] = useState({
    email_userName: "",
    password: ""
  });

  const handleChange = (event) => {
    setInputValue(prevState => ({
      ...prevState,
      [event.target.id]: event.target.value
    }))
  };

  return (
    <Box>
      <div className={styles.inputs} style={{marginBottom: "13px"}}>
        <label htmlFor="email_userName">Username or email address *</label>
        <input defaultValue={inputValue["email_userName"]} onChange={handleChange} type="text" id="email_userName"/>
      </div>
      <div className={styles.inputs} style={{marginBottom: "13px"}}>
        <label htmlFor="password">Password *</label>
        <input defaultValue={inputValue.password} onChange={handleChange} type="password" id="password"/>
      </div>
      <div className={styles.login}>
        <button>LOG IN <VscArrowSmallRight /></button>
      </div>
      <hr style={{margin: "2rem 0"}} />
      <div className={styles.bottom}>
        <p>or sign in with</p>
        <button onClick={signInWithGoogle}><FcGoogle /> Login With Google</button>
      </div>
    </Box>
  );
}

export default SignIn;
