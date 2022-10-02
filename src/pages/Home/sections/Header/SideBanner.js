import { ArrowRightAlt } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Styles.module.scss";
const SideBanner = () => {
  return (
    <Box component="div" className={styles.side}>
      <Box component="div" sx={{display: "flex", position: "relative"}}>
        <Box className={styles.sideBannerText}>
          <h4>Top Product</h4>
          <h3>Edifier<br />Stereo Bluetooth</h3>
          <Link to={"product/37600594"}>Shop Now <ArrowRightAlt sx={{ml: 1, fontSize: 22}} /></Link>
        </Box>
        <Box component={"img"} src={"https://firebasestorage.googleapis.com/v0/b/shop-8b88e.appspot.com/o/6f3dde1d-7071-4d2c-b081-34829ec961f8.jpg?alt=media&token=319a93f2-c254-4707-8ac3-b1c0b405ec89"} alt="banner" />
      </Box>
      <Box component="div" sx={{display: "flex", position: "relative"}}>
        <Box className={styles.sideBannerText}>
          <h4 style={{marginBottom: 0}}>Clearance</h4>
          <h3 style={{marginBottom: 0}}>GoPro - Fusion 360</h3>
          <p style={{lineHeight: 1.6}}>Save $70</p>
          <Link to={"product/63883680"}>Shop Now <ArrowRightAlt sx={{ml: 1, fontSize: 22}} /></Link>
        </Box>
        <Box component={"img"} src={"https://firebasestorage.googleapis.com/v0/b/shop-8b88e.appspot.com/o/24b02e35-568a-4247-8a96-d3a143fce500.jpg?alt=media&token=d6ca74e9-702c-4ba8-9819-41d9cf326350"} alt="banner" />
      </Box>
      <Box component="div" sx={{display: "flex", position: "relative"}}>
        <Box className={styles.sideBannerText}>
        <h4 style={{marginBottom: 0}}>Featured</h4>
        <h3 style={{marginBottom: "0.2rem"}}>Apple Watch 7</h3>
        <p style={{lineHeight: 1}}>Our Hottest Deals</p>
        <Link to={"product/93781049"}>Shop Now <ArrowRightAlt sx={{ml: 1, fontSize: 22}} /></Link>
        </Box>
        <Box component={"img"} src={"https://firebasestorage.googleapis.com/v0/b/shop-8b88e.appspot.com/o/02391b6e-1330-4e5f-a590-8327420b4721.jpg?alt=media&token=bb1db819-6925-4ef5-b99e-ccf7d3c3f501"} alt="banner" />
      </Box>
    </Box>
  );
}

export default SideBanner;
