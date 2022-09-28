import { Box, Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import styles from "./Styles.module.scss";
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DataContext } from 'App';
import ProductCard from 'components/ProductCard/ProductCard';
import "swiper/css";
import "swiper/css/pagination";
import "./Style.css"

const Featured = () => {
  const {product} = useContext(DataContext);
  return (
    <Container className={`${styles.featured} featured`}>
      <Typography variant="h1" component="span" className={styles.span}>
        Featured
      </Typography>
      <Box component="div" sx={{mt: "2rem"}}>
        <Swiper
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1222: {
              slidesPerView: 4,
              spaceBetween: 20,
            }
          }}
          modules={[Pagination, Navigation]}
          className={`${styles.swip} mySwiper`}
        >
          {
            Object.keys(product).length > 0 && 
            Object.values(product).map((item) => 
              item.section === "Featured" && <SwiperSlide key={item.title}><ProductCard  data={item}/></SwiperSlide>
            )
          }
        </Swiper>
      </Box>
    </Container>
  );
}

export default Featured;
