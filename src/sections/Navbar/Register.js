import { Box, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { VscArrowSmallRight } from 'react-icons/vsc';
import styles from './Styles.module.scss';

const Register = () => {
  const [inputValue, setInputValue] = useState({
    email_userName: "",
    username: "",
    password: "",
    repeatPassword: "",
    isAccept: false
  });

  const handleChange = (event) => {
    if (event.target.tagName === "INPUT") {
      setInputValue(prevState => ({
        ...prevState,
        isAccept: event.target.checked
      }))
      return ;
    }
    setInputValue(prevState => ({
      ...prevState,
      [event.target.id]: event.target.value
    }))
  };

  return (
    <div>
      <Box>
      <div className={styles.inputs} style={{marginBottom: "13px"}}>
        <label htmlFor="email_userName">Username or email address *</label>
        <input defaultValue={inputValue["email_userName"]} onChange={handleChange} type="text" id="email_userName"/>
      </div>
      <div className={styles.inputs} style={{marginBottom: "13px"}}>
        <label htmlFor="username">Username *</label>
        <input defaultValue={inputValue.username} onChange={handleChange} type="text" id="username"/>
      </div>
      <div className={styles.inputs} style={{marginBottom: "13px"}}>
        <label htmlFor="password">Password *</label>
        <input defaultValue={inputValue.password} onChange={handleChange} type="password" id="password"/>
      </div>
      <div className={styles.inputs} style={{marginBottom: "13px"}}>
        <label htmlFor="repeatPassword">Repeat Password *</label>
        <input defaultValue={inputValue.repeatPassword} onChange={handleChange} type="password" id="repeatPassword"/>
      </div>
      <div className={styles.login}>
        <button>SIGN UP <VscArrowSmallRight /></button>
        <FormControlLabel className={styles.checkBox} control={<Checkbox checked={inputValue.isAccept} onChange={handleChange} />} label="I agree to the privacy policy *" />
      </div>
    </Box>
    </div>
  );
}

export default Register;
