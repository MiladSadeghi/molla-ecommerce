import { Container } from '@mui/material';
import React, {useContext, useEffect}  from 'react';
import styles from "./Styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import {DataContext} from "../../App";
import "swiper/css";
import "./Style.css"

const Companies = () => {
  const data = useContext(DataContext);
  return (
    <Container>
      <Swiper className="mySwiper"
        style={{margin: "3.125rem 0 3.125rem 0"}}
        spaceBetween={10}
        breakpoints={{
          "0": {
            slidesPerView: 2
          },
          "420": {
              slidesPerView: 3
          },
          "600": {
              slidesPerView: 4
          },
          "900": {
              slidesPerView: 5
          },
          "1024": {
              slidesPerView: 6
          }
        }}>
        {
          data[2].length &&
          data[2].map((item, index) => {
            return (<SwiperSlide key={index}>
              <img src={item} alt="" />
            </SwiperSlide>)
          })
        }
      </Swiper>
      <hr style={{borderColor: "#ebebeb"}} />
    </Container>
  );
}

export default Companies;
