import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useContext, useState, useCallback } from 'react';
import { DataContext } from "App";
import styles from "./Styles.module.scss";
import { Breadcrumbs, Container, Grid, Link as BCLink, Rating } from '@mui/material';
import { AddShoppingCart, NavigateNext, FavoriteBorder } from "@mui/icons-material";
import { HiMinus, HiPlus } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";

const Product = () => {
  const urlParams = useParams();
  const productID = urlParams.productID;
  const navigate = useNavigate();
  const {product, cartList, setCartList, wishList, setWishList} = useContext(DataContext);
  const [imageIndex, setImageIndex] = useState(0);
  const [revImgArr, setRevImgArr] = useState([]);
  const [amount, setAmount] = useState(1);
  const [bgPosition, setBgPosition] = useState("50% 50%");

  useEffect(() => {
    if (product.length !== 0) {
      setRevImgArr(product[productID].urls.reverse());
    }
    return () => {
      if(product[productID]) {
        setRevImgArr(product[productID].urls)
      }
    }
  }, [])

  useEffect(() => {
    if (product.length !== 0 && !product[productID]) {
      navigate("/", {replace: true});
    } 

    if (product.length !== 0) {
      setRevImgArr(product[productID].urls.reverse());
    }

  }, [product, productID, navigate])

  const handleClick = (event) => {
    event.preventDefault();
    navigate(event.target.pathname)
  }

  const changeMainImage = useCallback((event) => {
    const selectedImgIndex = Number(event.currentTarget.getAttribute("imgindex"));
    setImageIndex(selectedImgIndex);
  }, [])

  function randomNumber() {
    return Math.floor(Math.random() * (5 - 1 + 1) + 1)
  }

  const changeAmount = (qty) => {
    if ((qty + amount) >= 1) {
      setAmount(prevState=> prevState + qty)
    }
  }

  const addToCart = (event) => {
    const productID = event.currentTarget.id;
    if (cartList.some((cartItem) => cartItem.product === productID)) {
      setCartList((cart) =>
        cart.map((cartItem) =>
          cartItem.product === productID
            ? {
                ...cartItem,
                amount: cartItem.amount + amount
              }
            : cartItem
        )
      );
      return;
    }
    setCartList((cart) => [
      ...cart,
      {product: productID, amount: amount }
    ]);
  }

  const addToWishlist = async (event) => {
    const productID = event.currentTarget.id;
    if (!wishList.includes(productID)) {
      setWishList(prevState => [...prevState, productID]);
    }
  }

  const zoom = (e) =>{
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / (width) * 100;
    const y = (e.clientY - top) / (height) * 100;
    setBgPosition(`${x}% ${y}%`)
  }

  return (
    <div>
      {
        product.length !== 0 && 
        <Container sx={{pb: "1rem"}}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />} sx={{p: "14px 0"}}>
              <BCLink 
                className={styles.brdHov}
                underline="none" 
                color="inherit" 
                href="/"
                fontSize={"14px"} >
                Home
              </BCLink>
              <BCLink
                underline="none"
                color="text.primary"
                href="/wishlist"
                aria-current="page"
                fontSize={"14px"} >
                Shopping Cart
              </BCLink>
            </Breadcrumbs>
          </div>
          <Grid container spacing={2} sx={{justifyContent: "center"}}>
            <Grid item md={6} className={styles.left}>
              <div className={styles.images}>
                {
                  revImgArr.map((item, index) => <img onClick={changeMainImage} imgindex={index} className={index === imageIndex ? styles.activeImage : styles.notActive} src={item} key={index} alt={"images"} />)
                }
              </div>
              <div className={styles.mainImage} onMouseMove={zoom} style={{backgroundImage: `url(${revImgArr[imageIndex]})`, backgroundPosition: bgPosition}}>
                <img src={revImgArr[imageIndex]} alt="mainImage" />
              </div>
            </Grid>
            <Grid item md={6}>
              <div className={styles.right}>
                <h1>{product[productID].title}</h1>
                <div className={styles.rate}>
                  <Rating name="read-only" size='small' value={randomNumber()} readOnly />
                  <p>({randomNumber()} Reviews)</p>
                </div>
                <p className={styles.price}>${product[productID].price}</p>
                <p className={styles.description}>{product[productID].description}</p>
                <div className={styles.quantity}>
                  <div>
                    <button onClick={(event) => changeAmount(-1)}>
                      <HiMinus />
                    </button>
                    <input type={"number"} min={1} value={amount} readOnly/>
                    <button onClick={(event) => changeAmount(+1)}>
                      <HiPlus />
                    </button>  
                  </div>
                </div>
                <div className={styles.buttons}>
                  <button className={styles.addToCardBtn} onClick={addToCart} id={product[productID].id}>
                    <AddShoppingCart />
                    ADD TO CART
                  </button>
                  <button className={styles.addToWishlist} onClick={addToWishlist} id={product[productID].id}>
                    <FavoriteBorder />
                    <p>Add to Wishlist</p>
                  </button>
                </div>
                <div className={styles.end}>
                  <p>Category: {product[productID].category}</p>
                  <div className={styles.socials}>
                    <p>Share on:</p>
                    <div className={styles.socialsIcon}>
                      <div><FaFacebookF /></div>
                      <div><FaTwitter /></div>
                      <div><FaInstagram /></div>
                      <div><FaYoutube /></div>
                      <div><FaPinterest /></div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      }
    </div>
  );
}

export default React.memo(Product);
