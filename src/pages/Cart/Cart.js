import React, { useContext, useState } from 'react';
import { DataContext } from 'App';
import { Breadcrumbs, Container, FormControl, FormControlLabel, Grid, Link as BCLink, Radio, RadioGroup } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { NavigateNext, Close } from '@mui/icons-material';
import {HiPlus, HiMinus} from "react-icons/hi";
import { TbRefresh } from "react-icons/tb"
import styles from "./Styles.module.scss";
import { auth } from 'components/Firebase';
import "./Style.css"
import { handleFirebaseError } from 'components/Handle';

const Cart = () => {
  const {product, cartList, setCartList, setSnackbar} = useContext(DataContext);
  const navigate = useNavigate();
  const [shipping, setShipping] = useState("0.00");

  
  const handleClick = (event) => {
    event.preventDefault();
    navigate(event.target.pathname)
  }

  const handleChange = (event) => {
    setShipping(event.target.value);
  };
  
  const deleteFromCart = (event) => {
    let array = cartList;
    const productIndex = array.findIndex(item => item.product === event.currentTarget.id)
    array.splice(productIndex, 1);
    setCartList(prevState => [...array]);
  }

  const formatToCurrency = (amount) => {
    const onlyNumbers = Number(String(amount).replace(/[^0-9.-]+/g,""));
    return onlyNumbers.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  const changeAmount = (amount, id) => {
    if (cartList.some((cartItem) => (cartItem.product === id) && ((cartItem.amount + amount) >= 1))) {
      setCartList((cart) =>
        cart.map((cartItem) =>
          cartItem.product === id
            ? {
                ...cartItem,
                amount: cartItem.amount + amount
              }
            : cartItem
        )
      );
    }
  }

  const subTotal = (status) => {
    let total = 0;
    cartList.forEach(item => {
      total += Number(parseFloat(product[item.product].price) * item.amount);
    })
    return status === "formatted" ? formatToCurrency(total) : total
  }

  const checkOut = (event) => {
    setCartList([]);
    setSnackbar({
      ...handleFirebaseError("okcheckout"),
      open: true,
    })
  } 

  return (
    <>
      {
        cartList.length === 0 ?
        <div className={styles.emptyCart}>
          <p>Your cart is empty!</p>
        </div>
        :
      <>
        <div className={styles.bg}>
          <h5>Shopping Cart</h5>
          <h6>Shop</h6>
        </div>
        <Container>
          <div className={styles.breadcrumb}>
            <div role="presentation" onClick={handleClick}>
              <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />} sx={{p: "14px 10px"}}>
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
          </div>
        </Container>
        <hr style={{margin: "0 0 40px", border: "none", borderBottom: "1px solid #ebebeb"}} />
        <Container sx={{pb: "50px"}}>
          <Grid container spacing={2}>
            <Grid item lg={8} xs={12}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cartList.map(item => 
                      <tr key={item.product}>
                        <td>
                          <div className={styles.product}>
                            <div className={styles.imgDiv}>
                              <img src={product[item.product].urls[0]} alt="product_photo" className={styles.imgCard} />
                            </div>
                            <Link to={`/product/${item.product}`}>{product[item.product].title}</Link>
                          </div>
                        </td>
                        <td>
                          <h4 className={styles.price}>${product[item.product].price}</h4>
                        </td>
                        <td className={styles.quantity}>
                          <div>
                            <button onClick={(event) => changeAmount(-1, item.product)}>
                              <HiMinus />
                            </button>
                            <input type={"number"} min={1} value={item.amount} readOnly/>
                            <button onClick={(event) => changeAmount(+1, item.product)}>
                              <HiPlus />
                            </button>  
                          </div>
                        </td>
                        <td className={styles.totalPrice} >
                          ${formatToCurrency(product[item.product].price * item.amount)}
                        </td>
                        <td>
                          <div className={styles.deleteBtn} onClick={deleteFromCart} id={product[item.product].id}>
                            <Close  />
                          </div>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </Grid>
            <Grid item lg={4} xs={12}>
              <div className={styles.checkOutProcess}>
                <div className={styles.cartDetail}>
                  <h5>Cart Total</h5>
                  <p>Subtotal: <span>${subTotal("formatted")}</span></p>
                </div>
                <div className={styles.shipping}>
                  <p className={styles.title}>Shipping:</p>
                </div>
                <FormControl fullWidth sx={{pb: "23px", borderBottom: "1px solid #ebebeb"}}>
                  <RadioGroup
                    value={shipping}
                    onChange={handleChange}
                  >
                    <FormControlLabel sx={{mr: 0}} value="0.00" control={<Radio size='small' color={"warning"} />} 
                      label={
                        <p className={styles.shippingItem}>Free Shipping: <span>$0.00</span></p>
                      } />
                    <FormControlLabel sx={{mr: 0}} value="10.00" control={<Radio size='small' color={"warning"}/>}  
                      label={
                        <p className={styles.shippingItem}>Standard: <span>$10.00</span></p>
                      }
                      />
                    <FormControlLabel sx={{mr: 0}} value="20.00" control={<Radio size='small' color={"warning"} />} 
                      label={
                        <p className={styles.shippingItem}>Express: <span>$20.00</span></p>
                      } />
                  </RadioGroup>
                </FormControl>
                <div className={styles.end}>
                  <p>
                    Total
                    <span>${formatToCurrency((subTotal() + Number(shipping)).toFixed(2))}</span>
                  </p>
                  <button className={`${styles.checkOutBtn} ${auth.currentUser.isAnonymous && styles.notActive}`} disabled={auth.currentUser.isAnonymous} onClick={checkOut} >
                    {
                      auth.currentUser.isAnonymous ?
                      "You should sign in first":
                      "Checkout"
                    }
                  </button>
                </div>
              </div>
              <Link to='/' className={styles.continueBtn}>CONTINUE SHOPPING <TbRefresh /></Link>
            </Grid>
          </Grid>
        </Container>
        </>
      }
      <hr style={{
        display: "block",
        height: "1px",
        border: "0",
        borderTop: "1px solid #ccc",
        margin: "0",
        padding: "0",
      }} />
    </>
  );
}

export default Cart;
