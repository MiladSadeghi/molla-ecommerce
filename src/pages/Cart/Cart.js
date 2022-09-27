import React, { useContext, useState } from 'react';
import { DataContext } from 'App';
import { Breadcrumbs, Container, FormControl, FormControlLabel, FormLabel, Grid, Link, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavigateNext, Close } from '@mui/icons-material';
import {HiPlus, HiMinus} from "react-icons/hi";
import styles from "./Styles.module.scss";
import { auth } from 'components/Firebase';
import "./Style.css"

const Cart = () => {
  const data = useContext(DataContext);
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
    let array = data[6];
    const productIndex = array.indexOf(event.currentTarget.id);
    array.splice(productIndex, 1);
    data[7](prevState => [...array]);
  }

  const formatToCurrency = (amount) => {
    const onlyNumbers = Number(String(amount).replace(/[^0-9.-]+/g,""));
    return onlyNumbers.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  const changeAmount = (amount, id) => {
    if (data[6].some((cartItem) => (cartItem.product === id) && ((cartItem.amount + amount) >= 1))) {
      data[7]((cart) =>
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
    data[6].forEach(item => {
      total += Number(parseFloat(data[0][item.product].price) * item.amount);
    })
    return status === "formatted" ? formatToCurrency(total) : total
  }

  const checkOut = (event) => {
    console.log(event)
  } 

  return (
    <>
      {
        data[6].length === 0 ?
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
                <Link 
                  className={styles.brdHov}
                  underline="none" 
                  color="inherit" 
                  href="/"
                  fontSize={"14px"} >
                  Home
                </Link>
                <Link
                  underline="none"
                  color="text.primary"
                  href="/wishlist"
                  aria-current="page"
                  fontSize={"14px"} >
                  Shopping Cart
                </Link>
              </Breadcrumbs>
            </div>
          </div>
        </Container>
        <hr style={{margin: "0 0 40px", border: "none", borderBottom: "1px solid #ebebeb"}} />
        <Container>
          <Grid container spacing={2}>
            <Grid item lg={8}>
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
                    data[6].map(item => 
                      <tr key={item.product}>
                        <td>
                          <div className={styles.product}>
                            <div className={styles.imgDiv}>
                              <img src={data[0][item.product].urls[0]} alt="product_photo" className={styles.imgCard} />
                            </div>
                            <h3>{data[0][item.product].title}</h3>
                          </div>
                        </td>
                        <td>
                          <h4 className={styles.price}>${data[0][item.product].price}</h4>
                        </td>
                        <td className={styles.quantity}>
                          <div>
                            <button onClick={(event) => changeAmount(event, -1, item.product)}>
                              <HiMinus />
                            </button>
                            <input type={"number"} min={1} value={item.amount} readOnly/>
                            <button onClick={(event) => changeAmount(event, +1, item.product)}>
                              <HiPlus />
                            </button>  
                          </div>
                        </td>
                        <td className={styles.totalPrice} >
                          ${formatToCurrency(data[0][item.product].price * item.amount)}
                        </td>
                        <td>
                          <div className={styles.deleteBtn} onClick={deleteFromCart} id={data[0][item.product].id}>
                            <Close  />
                          </div>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </Grid>
            <Grid item lg={4}>
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
                <div>
                  <div className={styles.end}>
                    <p>
                      Total
                      <span>${formatToCurrency((subTotal() + Number(shipping)).toFixed(2))}</span>
                    </p>
                    <button className={styles.checkOutBtn} disabled={auth.currentUser.isAnonymous} onClick={checkOut} 
                    style={auth.currentUser.isAnonymous && {opacity: 0.4, background: "#c96", color: "#fff", cursor: "default"}} >
                      {
                        auth.currentUser.isAnonymous ?
                        "You should sign in first":
                        "Checkout"
                      }
                    </button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        </>
      }
    </>
  );
}

export default Cart;
