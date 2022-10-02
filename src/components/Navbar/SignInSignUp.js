import { Backdrop, Box, Button, Fade, Modal, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import styles from "./Styles.module.scss";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import SignIn from './SignIn';
import Register from './Register';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const SignInSignUp = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Button onClick={handleOpen} variant="text" className={styles.topHover} sx={{fontWeight: "300", textTransform: "none"}}>Sign in / Sign up</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }} >
        <Fade in={open}>
          <Box className={styles["modal-signin-signup"]}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <Tabs 
                value={value} 
                onChange={handleChange} 
                centered
                variant="fullWidth"
                sx={{borderBottom: ".1rem solid #cacaca", display: "flex"}}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#fcb941"
                  }
                }}>
                <Tab sx={{textTransform: "none", fontSize: "1.5rem"}} className={(value === 0)? styles.signSelect: styles.topHover} label="Sign In" {...a11yProps(0)} />
                <Tab sx={{textTransform: "none", fontSize: "1.5rem"}} className={(value === 1)? styles.signSelect: styles.topHover}  label="Register" {...a11yProps(1)} />
              </Tabs>

              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex} >

                <TabPanel value={value} index={0} dir={theme.direction}>
                  <SignIn />
                </TabPanel>

                <TabPanel value={value} index={1} dir={theme.direction}>
                  <Register />
                </TabPanel>

              </SwipeableViews>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default SignInSignUp;
