import React, { useContext } from 'react';
import { DataContext } from 'App';
import { Breadcrumbs, Container, Link as BCLink } from '@mui/material';
import styles from "./Styles.module.scss";
import { useNavigate, Link } from 'react-router-dom';
import { NavigateNext, AddShoppingCart, Close } from '@mui/icons-material';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
const Wishlist = () => {
  const {product, wishList, setWishList, cartList, setCartList} = useContext(DataContext);
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(event.target.pathname)
  }

  const deleteFromWishlist = (event) => {
    let array = wishList;
    const productIndex = array.indexOf(event.currentTarget.id);
    array.splice(productIndex, 1);
    setWishList(prevState => [...array]);
  }

  const addToCart = (event) => {
    const productID = event.currentTarget.id;
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
    <>
    {
      wishList.length === 0 ?
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
                  Wishlist
                </BCLink>
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
                  wishList.map(item => 
                    <tr key={item}>
                      <td>
                        <div className={styles.product}>
                          <div className={styles.imgDiv}>
                            <img src={product[item].urls[0]} alt="product_photo" className={styles.imgCard} />
                          </div>
                          <Link to={`/product/${item}`}>{product[item].title}</Link>
                        </div>
                      </td>
                      <td>
                        <h4 className={styles.price}>${product[item].price}</h4>
                      </td>
                      <td className={styles.addToCardBtn}>
                        <button onClick={addToCart} id={product[item].id}>
                          <AddShoppingCart />
                          ADD TO CART
                        </button>
                      </td>
                      <td>
                        <div className={styles.deleteBtn} onClick={deleteFromWishlist} id={product[item].id}>
                          <Close  />
                        </div>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
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
        </Container>
      </>
    }
    </>
  );
}

export default Wishlist;
