import { Container } from '@mui/material';
import React, { useContext }  from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { DataContext } from 'App';
import "swiper/css";
import "./Style.css"

const Companies = () => {
  const {logos} = useContext(DataContext);
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
          logos.length &&
          logos.map((item, index) => {
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
