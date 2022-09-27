import { CssBaseline } from '@mui/material';
import { lazy, Suspense, useRef } from "react";
import Loading from "./components/Loading";
import { useState, createContext, useEffect } from 'react';
import { AddToCartList, AddToWishList, AnonymouslySignIn, db, GetUserCart, GetUserWishList } from './components/Firebase';
import { onValue, ref } from 'firebase/database';
import Footer from "./components/Footer/Footer";
import { auth } from './components/Firebase';
import { Route, Routes } from 'react-router-dom';
import WishList from 'pages/Wishlist/Wishlist';
import { onAuthStateChanged } from 'firebase/auth';
import Cart from './pages/Cart/Cart';

const Home = lazy(() => import('./pages/Home/Home'));
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
export const DataContext = createContext();

function App() {
  const [product, setProduct] = useState([]);
  const [logos, setLogos] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [cartList, setCartList] = useState([]);
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
        setWishList(await GetUserWishList());
        setCartList(await GetUserCart());
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

  return (
    <DataContext.Provider value={[product, setProduct, logos, setLogos, wishList, setWishList, cartList, setCartList]}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/wishlist' element={<WishList />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
      </Suspense>
    </DataContext.Provider>
  );
}

export default App;
