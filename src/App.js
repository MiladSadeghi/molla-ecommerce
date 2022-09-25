import { CssBaseline } from '@mui/material';
import { lazy, Suspense, useRef } from "react";
import Loading from "./components/Loading";
import { useState, createContext, useEffect } from 'react';
import { AddToWishList, db, GetUserWishList } from './components/Firebase';
import { onValue, ref } from 'firebase/database';
import Footer from "./components/Footer/Footer";
import { auth } from './components/Firebase';
import { Route, Routes } from 'react-router-dom';
import WishList from 'pages/Wishlist/Wishlist';

const Home = lazy(() => import('./pages/Home/Home'));
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
export const DataContext = createContext();

function App() {
  const [product, setProduct] = useState([]);
  const [logos, setLogos] = useState([]);
  const [wishList, setWishList] = useState([]);
  const oneTime = useRef(false);

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
    if (auth.currentUser) {
      GetUserWishList();
    }
  }, [])

  useEffect(() => {
    if (oneTime && auth.currentUser) {
      AddToWishList(wishList);
    } else {
      oneTime.current = true;
    }
  }, [wishList])

  return (
    <DataContext.Provider value={[product, setProduct, logos, setLogos, wishList, setWishList]}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/wishlist' element={<WishList />} />
        </Routes>
        <Footer />
      </Suspense>
    </DataContext.Provider>
  );
}

export default App;
