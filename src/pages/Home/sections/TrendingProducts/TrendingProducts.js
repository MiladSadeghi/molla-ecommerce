import { Container, Grid } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import styles from "./Styles.module.scss"
import { Box, Tab, Tabs as Tbs } from '@mui/material';
import { DataContext } from 'App';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from 'components/ProductCard/ProductCard';
import { v4 } from 'uuid';
import "swiper/css";
import "./Style.css";
import { Link } from 'react-router-dom';

const TrendingProducts = () => {
  const [value, setValue] = React.useState(0);
  const [productDivider, setProductDivider] = useState({
    "All": [],
    "TV": [],
    "Computers": [],
    "Tablets & Cell Phones": [],
    "Smartwatches": [],
    "Accessories": [],
  })
  const {product} = useContext(DataContext);

  useEffect(() => {
    if(Object.keys(product).length !== 0) {
    Object.keys(productDivider).forEach(item1 => {
      Object.values(product).forEach((item2)=> {
        if(item1 === item2.category && item2.section === "TrendingProducts") {
            setProductDivider(prevState => ({
              ...prevState, [item1]: [...prevState[item1], item2]
            }))
          }
        })
      })
      setProductDivider(prevState => ({
        ...prevState, "All": [
          product["15725369"], 
          product["03078624"], 
          product["85358976"], 
          product["08366542"], 
          product["32315657"], 
          product["47230516"], 
        ]
      }))
    }
  }, [product])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className={"trending-products"}>
      <div className={styles.top}>
        <h1>Trending Products</h1>
        <div className={styles.body}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <Tbs value={value} onChange={handleChange} centered className={styles.tabs} TabIndicatorProps={{style: {background:'#fcb941', height: "2px"}}}
            sx={{"& button.Mui-selected": {color: "#fcb941"}}}>
              <Tab label="All" />
              <Tab label="TV" />
              <Tab label="COMPUTERS" />
              <Tab label="TABLETS & CELL PHONES" />
              <Tab label="SMARTWATCHES" />
              <Tab label="ACCESSORIES" />
            </Tbs>
          </Box>
        </div>
      </div>
      <div className={styles.body1}>
          <Link to={"product/06298355"} style={{marginRight: "22px"}} className={styles.bannerImgDiv}>
            <img src="https://firebasestorage.googleapis.com/v0/b/shop-8b88e.appspot.com/o/05bdbb14-93d8-451a-a62e-b1e02f393c04.jpg?alt=media&token=74ad94bb-d142-4a69-9e57-b82092f2069c" alt="" className={styles.bannerImg} />
          </Link>
            <Swiper
              navigation={true}
              modules={[Navigation]}
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
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1222: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                }
              }}
              className={` mySwiper`}
            >
              {
                Object.keys(product).length > 0 && 
                Object.values(productDivider)[value].map(item=> 
                  <SwiperSlide key={v4()}><ProductCard sty={{}} data={item}/></SwiperSlide>
                )
              }
            </Swiper>
      </div>
      <hr />
    </Container>
  );
}

export default TrendingProducts;
