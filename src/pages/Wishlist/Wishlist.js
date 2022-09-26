import React, { useContext } from 'react';
import { DataContext } from 'App';
import { Breadcrumbs, Container, Link } from '@mui/material';
import styles from "./Styles.module.scss";
import { useNavigate } from 'react-router-dom';
import { NavigateNext, AddShoppingCart, Close } from '@mui/icons-material';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
import emptyCart from "images/shopping-bag.png"
const Wishlist = () => {
  const data = useContext(DataContext);
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(event.target.pathname)
  }

  const deleteFromWishlist = (event) => {
    let array = data[4];
    const productIndex = array.indexOf(event.currentTarget.id);
    array.splice(productIndex, 1);
    data[5](prevState => [...array]);
  }

  const addToCart = (event) => {
    const productID = event.currentTarget.id;
    if (data[6].some((cartItem) => cartItem.product === productID)) {
      data[7]((cart) =>
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
    data[7]((cart) => [
      ...cart,
      {product: productID, amount: 1 } // <-- initial amount 1
    ]);
  }

  return (
    <>
    {
      data[4].length === 0 ?
        <div className={styles.emptyCart}>
          <p>You must have a wishlist! do not have one?</p>
        </div>
        :
      <>
        <div className={styles.bg}>
          <h5>Wishlist</h5>
          <h6>Shop</h6>
        </div>
        <Container>
          <div className={styles.breadcrumb}>
            <div role="presentation" onClick={handleClick}>
              <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />} sx={{p: "14px 10px", mb: "40px"}}>
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
                  Wishlist
                </Link>
              </Breadcrumbs>
            </div>
          </div>
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  data[4].map(item => 
                    <tr key={item}>
                      <td>
                        <div className={styles.product}>
                          <div className={styles.imgDiv}>
                            <img src={data[0][item].urls[0]} alt="product_photo" className={styles.imgCard} />
                          </div>
                          <h3>{data[0][item].title}</h3>
                        </div>
                      </td>
                      <td>
                        <h4 className={styles.price}>${data[0][item].price}</h4>
                      </td>
                      <td className={styles.addToCardBtn}>
                        <button onClick={addToCart} id={data[0][item].id}>
                          <AddShoppingCart />
                          ADD TO CART
                        </button>
                      </td>
                      <td>
                        <div className={styles.deleteBtn} onClick={deleteFromWishlist} id={data[0][item].id}>
                          <Close  />
                        </div>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
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
        </Container>
      </>
    }
    </>
  );
}

export default Wishlist;
