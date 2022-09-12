import { Card, CardContent, CardMedia, Rating } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from "./Styles.module.scss";

function randomNumber() {
  return Math.floor(Math.random() * (5 - 1 + 1) + 1)
}

const ProductCard = ({data}) => {
  return (
    <Card sx={{ height: "100%" }} className={`${styles.card} card`}>
      <Box component="div" sx={{display: "flex", alignItems: "center", justifyContent: "center", width: 250, height: 250, mx: "auto"}}>
        <CardMedia
          component="img"
          image={data.urls[1]}
          alt="green iguana"
          sx={{ width: "100%" }}
        />
      </Box>
      <CardContent className={styles.cardContent}>
        <p className={styles.category}>{data.category}</p>
        <h5 className={styles.title}>{data.title}</h5>
        <p className={styles.price}>${data.price}</p>
        <Rating name="read-only" size='small' value={randomNumber()} readOnly />
      </CardContent>
    </Card>
  );
}

export default ProductCard;
