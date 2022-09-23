import { Card, CardContent, CardMedia, Rating, Box } from '@mui/material';
import React, { useContext } from 'react';
import { FiHeart } from "react-icons/fi"
import { MdAddShoppingCart } from "react-icons/md";
import { GiBinoculars } from "react-icons/gi";
import { DataContext } from '../App';
import styles from "./ProductCard.module.scss";
import { AddToWishList } from './Firebase';

function randomNumber() {
  return Math.floor(Math.random() * (5 - 1 + 1) + 1)
}

const ProductCard = (props) => {
  const data = useContext(DataContext);
  const addToCart = async (event) => {
    if (!data[4].includes(event.currentTarget.getAttribute("productid"))) {
      data[5](prevState => [...prevState, event.currentTarget.getAttribute("productid")] , AddToWishList(data[4]));
    }
  }

  return (
    <Card style={{...props.sty ,boxShadow: "none"}} sx={{ height: "100%" }} className={`${styles.card} card`}>
      <Box component="div" sx={{display: "flex", alignItems: "center", justifyContent: "center", position: "relative"}} className={styles.imageDiv}>
        <CardMedia
          component="img"
          image={props.data.urls[1]}
          alt="green iguana"
          sx={{ width: "100%" }}
        />
        <div className={styles.addToWishList}>
          <FiHeart />
          <div className={styles.top}>
            <p>add to wishlist</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.content}>
            <div productid={props.data.id} onClick={addToCart}>
              <MdAddShoppingCart />
              <h5>add to cart</h5>
            </div>
            <div className={styles.rode}></div>
            <div>
              <GiBinoculars />
              <h5>quick view</h5>
            </div>
          </div>
        </div>
      </Box>
      <CardContent className={styles.cardContent}>
        <p className={styles.category}>{props.data.category}</p>
        <h5 className={styles.title}>{props.data.title}</h5>
        <p style={(props?.children) && {color: "#EF837B"}} className={styles.price}>${props.data.price} {props?.children && props.children}</p>
        <Rating name="read-only" size='small' value={randomNumber()} readOnly />
      </CardContent>
    </Card>
  );
}

export default ProductCard;
