import { Card, CardContent, CardMedia, Rating, Box } from '@mui/material';
import React, { useContext } from 'react';
import { FiHeart } from "react-icons/fi"
import { MdAddShoppingCart } from "react-icons/md";
import { GiBinoculars } from "react-icons/gi";
import { DataContext } from 'App';
import styles from "./ProductCard.module.scss";
import { Link } from 'react-router-dom';

function randomNumber() {
  return Math.floor(Math.random() * (5 - 1 + 1) + 1)
}

const ProductCard = (props) => {
  const {wishList, setWishList, cartList, setCartList} = useContext(DataContext);

  const addToWishlist = async (event) => {
    if (!wishList.includes(event.currentTarget.getAttribute("productid"))) {
      setWishList(prevState => [...prevState, event.currentTarget.getAttribute("productid")]);
    }
  }

  const addToCart = (event) => {
    const productID = event.currentTarget.getAttribute("productid");
    if (cartList.some((cartItem) => cartItem.product === productID)) {
      setCartList((cart) =>
        cart.map((cartItem) =>
          cartItem.product === productID
            ? {
                ...cartItem,
                amount: cartItem.amount + 1
              }
            : cartItem
        )
      );
      return;
    }
    setCartList((cart) => [
      ...cart,
      {product: productID, amount: 1 }
    ]);
  }

  return (
    <Card style={{boxShadow: "none", width: "100%", ...props.sty}} sx={{ height: "100%" }} className={`${styles.card} card`}>
      <Box component="div" sx={{display: "flex", alignItems: "center", justifyContent: "center", position: "relative"}} className={styles.imageDiv}>
        <CardMedia
          component="img"
          image={props.data.urls[1]}
          alt="green iguana"
          sx={{ width: "100%" }}
        />
        <div className={styles.addToWishList} productid={props.data.id} onClick={addToWishlist}>
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
            <Link to={`product/${props.data.id}`}>
              <GiBinoculars />
              <h5>quick view</h5>
            </Link>
          </div>
        </div>
      </Box>
      <CardContent className={styles.cardContent}>
        <p className={styles.category}>{props.data.category}</p>
        <Link to={`product/${props.data.id}`} className={styles.title}>{props.data.title}</Link>
        <p style={(props?.children) && {color: "#EF837B"}} className={styles.price}>${props.data.price} {props?.children && props.children}</p>
        <Rating name="read-only" size='small' value={randomNumber()} readOnly />
      </CardContent>
    </Card>
  );
}

export default ProductCard;
