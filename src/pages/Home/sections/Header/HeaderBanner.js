import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import styles from "./Styles.module.scss";
import { Box } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HeaderBanner = () => {
  return (
    <Swiper 
      navigation={true} modules={[Navigation, Autoplay]} 
      className={`${styles.swiper} swiperC`} 
      autoplay={{delay: 6000, 
      disableOnInteraction: false,
      pauseOnMouseEnter: true }}>
      <SwiperSlide className={styles["swiper-slide"]} position='relative'>
        <Box component="div" className={styles.headerSliderText}>
          <h3>Daily Deals</h3>
          <h1>AirPods<br /> Earphones</h1>
          <p>
            <sup className={styles.firstSup}>Today:</sup>
            <span>$247<sup className={styles.secondSup}>.99</sup></span>
          </p>
          <Link to={"/product/59851231"} className={styles.bannerButton}>
            Click Here <ArrowRightAlt sx={{ml: 1, fontSize: 22}} />
          </Link>
        </Box>
        <Box component="img" className={styles.photo1} src="https://firebasestorage.googleapis.com/v0/b/shop-8b88e.appspot.com/o/b19ec7de-2a28-4eff-9e3b-564f9864058b.jpg?alt=media&token=49243794-c5d4-4da9-8a28-2bd8053460d2" />
      </SwiperSlide>
      <SwiperSlide className={styles["swiper-slide"]} position='relative'>
        <Box component="div" className={styles.headerSliderText}>
          <h3>Deals And Promotions</h3>
          <h1>Echo Dot<br />3rd Gen</h1>
          <p>
            <sup className={styles.firstSup} style={{textDecoration: "line-through", color: "#333"}}>$49.99</sup>
            <span>$29<sup className={styles.secondSup} style={{top: "-0.2em"}}>.99</sup></span>
          </p>
          <Link to={"product/67384206"} className={styles.bannerButton}>
            Click Here <ArrowRightAlt sx={{ml: 1, fontSize: 22}} />
          </Link>
        </Box>
        <Box component="img" className={styles.photo2} src="https://firebasestorage.googleapis.com/v0/b/shop-8b88e.appspot.com/o/27a789d0-6270-4fbf-aa6c-dd9d062070cd.jpg?alt=media&token=3dae993d-4ce1-4958-b5cb-490f44dc5601" />
      </SwiperSlide>
    </Swiper>
  );
}

export default HeaderBanner;
