import { CssBaseline } from '@mui/material';
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import { useState, createContext, useEffect } from 'react';
import { AddToWishList, db } from './components/Firebase';
import { onValue, ref } from 'firebase/database';
import Footer from "./components/Footer/Footer";
import { auth } from './components/Firebase';

const Home = lazy(() => import('./pages/Home/Home'));
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
export const DataContext = createContext();

function App() {
  const [product, setProduct] = useState([]);
  const [logos, setLogos] = useState([]);
  const [wishList, setWishList] = useState([]);

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
      AddToWishList(wishList);
    }
  }, [wishList])

  return (
    <DataContext.Provider value={[product, setProduct, logos, setLogos, wishList, setWishList]}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Home />
        <Footer />
      </Suspense>
    </DataContext.Provider>
  );
}

export default App;
