import { Box, Checkbox, FormControlLabel  } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import { VscArrowSmallRight } from 'react-icons/vsc';
import { handleFirebaseError, validateSignUp } from '../Handle';
import { Bars } from  'react-loader-spinner'
import { GetUserCart, GetUserWishList, registerWithUserAndPassword } from '../Firebase';
import { DataContext } from 'App';
import styles from './Styles.module.scss';

const Register = () => {
  const {setSnackbar, setWishList, setCartList} = useContext(DataContext);
  const [inputValue, setInputValue] = useState({
    email: "",
    userName: "",
    password: "",
    repeatPassword: "",
    isAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({})
  const [registerButton, setRegisterButton] = useState({
    children: <>SIGN UP <VscArrowSmallRight /></>,
    status: false
  });

  const handleChange = (event) => {
    if (event.target.type === "checkbox") {
      setInputValue(prevState => ({
        ...prevState,
        isAccepted: event.target.checked
      }))
      return ;
    } else {
      setInputValue(prevState => ({
        ...prevState,
        [event.target.id]: event.target.value
      }))
    }
  };

  useEffect(() => {
    setErrors(validateSignUp(inputValue));
  }, [inputValue, touched]);

  const focusHandler = (event) => {
    setTouched({...touched, [event.target.id]: true})
  };

  const registerUser = async () => {
    if (!Object.keys(errors).length)  {
      try {
        setRegisterButton({
          children: <Bars height="20" width="80" color="#fcb941" />,
          status: true
        })
        await registerWithUserAndPassword(inputValue, setWishList, setCartList);
        setWishList(await GetUserWishList());
        setCartList(await GetUserCart());
        setSnackbar({
          ...handleFirebaseError("regd"),
          open: true,
        })
        
      } catch (error) {
        setRegisterButton({
          children: <>SIGN UP <VscArrowSmallRight /></>,
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
        userName: true,
        password: true,
        repeatPassword: true,
        isAccepted: true
      })
    }
  };

  return (
    <div>
      <Box>
        <div className={styles.inputs} style={{marginBottom: "13px"}}>
          <div>
            <label htmlFor="email">Email Address *</label>
            {errors.email && touched.email && <p>{errors.email}</p>}
          </div>
          <input defaultValue={inputValue["email"]} onChange={handleChange} onFocus={focusHandler} type="email" id="email"/>
        </div>
        <div className={styles.inputs} style={{marginBottom: "13px"}}>
          <div>
            <label htmlFor="userName">Username *</label>
            {errors.userName && touched.userName && <p>{errors.userName}</p>}
          </div>
          <input defaultValue={inputValue["userName"]} onChange={handleChange} onFocus={focusHandler} type="text" id="userName"/>
        </div>
        <div className={styles.inputs} style={{marginBottom: "13px"}}>
          <div>
            <label htmlFor="password">Password *</label>
            {errors.password && touched.password && <p>{errors.password}</p>}
          </div>
          <input defaultValue={inputValue["password"]} onChange={handleChange} onFocus={focusHandler} type="password" id="password"/>
        </div>
        <div className={styles.inputs} style={{marginBottom: "13px"}}>
          <div>
            <label htmlFor="repeatPassword">Repeat Password *</label>
            {errors.repeatPassword && touched.repeatPassword && <p>{errors.repeatPassword}</p>}
          </div>
          <input defaultValue={inputValue["repeatPassword"]} onChange={handleChange} onFocus={focusHandler} type="password" id="repeatPassword"/>
        </div>
        <div className={styles.login}>
          <button disabled={registerButton.status} className={registerButton.status? styles.none: ""} onClick={registerUser}>{registerButton.children}</button>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
            <FormControlLabel className={styles.checkBox} control={<Checkbox checked={inputValue.isAccepted} onChange={handleChange} onFocus={focusHandler} id="isAccepted" />} label="I agree to the privacy policy *" />
            {errors.isAccepted && touched.isAccepted && <p style={{color: "red", fontSize: ".7rem"}}>{errors.isAccepted}</p>}
          </div>
        </div>
      
      </Box>
    </div>
  );
}

export default Register;
