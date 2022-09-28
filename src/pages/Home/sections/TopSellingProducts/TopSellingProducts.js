import { Box, Container, Tab, Tabs as Tbs } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 } from 'uuid';
import { DataContext } from 'App'; 
import ProductCard from 'components/ProductCard/ProductCard';
import styles from "./Styles.module.scss";
import "./Style.css";

const TopSellingProducts = () => {
  const [value, setValue] = useState(0);
  const [productDivider, setProductDivider] = useState({
    "All": [],
    "TV": [],
    "Computers": [],
    "Tablets & Cell Phones": [],
    "Smartwatches": [],
    "Accessories": [],
  })
  const {product} = useContext(DataContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(Object.keys(product).length !== 0) {
    Object.keys(productDivider).forEach(item1 => {
      Object.values(product).forEach((item2)=> {
        if(item1 === item2.category && item2.section === "TopSelling") {
            setProductDivider(prevState => ({
              ...prevState, [item1]: [...prevState[item1], item2]
            }))
          }
        })
      })
      setProductDivider(prevState => ({
        ...prevState, "All": [
          product["44543398"], 
          product["38948539"], 
          product["69372685"], 
          product["59293665"], 
          product["47253176"], 
          product["44037468"], 
        ]
      }))
    }
  }, [product])

  return (
    <Container className={"top-selling"}>
      <div style={{marginBottom: "3.75rem"}}>
        <div className={styles.top}>
          <h1>Top Selling Products</h1>
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
                  <SwiperSlide key={v4()}><ProductCard sty={{height: "100%"}} data={item}/></SwiperSlide>
                )
              }
            </Swiper>
        </div>
      </div>
      <hr />
    </Container>
  );
}

export default TopSellingProducts;
