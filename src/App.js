import { CssBaseline } from '@mui/material';
import { lazy, Suspense, useRef, forwardRef } from "react";
import Loading from "components/Loading";
import { useState, createContext, useEffect } from 'react';
import { AddToCartList, AddToWishList, AnonymouslySignIn, db, GetUserCart, GetUserWishList } from 'components/Firebase';
import { onValue, ref } from 'firebase/database';
import Footer from "components/Footer/Footer";
import { auth } from 'components/Firebase';
import { Navigate, Route, Routes } from 'react-router-dom';
import WishList from 'pages/Wishlist/Wishlist';
import { onAuthStateChanged } from 'firebase/auth';
import MuiAlert from '@mui/material/Alert';
import { Snackbar, Fade } from '@mui/material';
import Cart from 'pages/Cart/Cart';
import Product from 'pages/Product/Product';

const Home = lazy(() => import('./pages/Home/Home'));
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
export const DataContext = createContext();

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [product, setProduct] = useState([]);
  const [logos, setLogos] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [snackbar, setSnackbar] = useState({
    message: "",
    open: false,
    severity: ""
  })
  const updateWishlist = useRef(false);
  const updateCart = useRef(false);

  useEffect(() => {
    const products = ref(db, '/products');
    const logos = ref(db, 'logos/');
  
    onValue(products, (snapshot) => {
      const data = snapshot.val();
      setProduct(data)
    });

    onValue(logos, (snapshot) => {
      const data = snapshot.val();
      setLogos(data)
    });
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userWish = await GetUserWishList();
        const userCart = await GetUserCart();
        setWishList((prevState) => [
          ...prevState,
          ...userWish
        ]);
        setCartList((prevState) => [
          ...prevState,
          ...userCart
        ]);
      } else {
        AnonymouslySignIn();
      }
    })
  }, [])

  useEffect(() => {
    if (updateWishlist && auth.currentUser) {
      AddToWishList(wishList);
    } else {
      updateWishlist.current = true;
    }
  }, [wishList])

  useEffect(() => {
    if (updateCart && auth.currentUser) {
      AddToCartList(cartList);
    } else {
      updateCart.current = true;
    }
  }, [cartList])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({...snackbar, open: !snackbar.open});
  };

  return (
    <DataContext.Provider value={{product, setProduct, logos, setLogos, wishList, setWishList, cartList, setCartList, snackbar, setSnackbar}}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/wishlist' element={<WishList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:productID' element={<Product />} />
          <Route path='/product' element={<Navigate to={"/"} />} />
        </Routes>
        <Footer />
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose} TransitionComponent={Fade}>
          <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Suspense>
    </DataContext.Provider>
  );
}

export default App;
