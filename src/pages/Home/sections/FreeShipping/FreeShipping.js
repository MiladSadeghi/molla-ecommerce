import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import styles from "./Styles.module.scss";

const FreeShipping = () => {
  return (
    <Container sx={{my: "2rem"}}>
      <CssBaseline />
      <div className={styles.bgImage}>
        <Box className={styles.father}>
          <Box component="div" className={styles.leftBox}>
            <h5>New Deals<br /><span>Start Daily at 12pm e.t.</span></h5>
          </Box>
          <Box component="div" className={styles.rod} />
          <Box component="div" className={styles.rightBox}>
            <Box component="div">
              <p>Get <span>FREE SHIPPING* & 5% rewards</span> on <br/>
            every order with Molla Theme rewards program
            </p>
            </Box>
          </Box>
          <button className={styles.btn}>Add To Card For $50.00/YR <ArrowRightAlt sx={{ml: ".7rem", fontSize: 22, verticalAlign: "middle"}} /></button>
        </Box>
      </div>
    </Container>
  );
}

export default FreeShipping;
