import { CssBaseline } from '@mui/material';
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import { useState, createContext, useEffect } from 'react';
import { db } from './components/Firebase';
import { onValue, ref } from 'firebase/database';
import Footer from "./sections/Footer/Footer";

const Home = lazy(() => import('./pages/Home'));
const Navbar = lazy(() => import('./sections/Navbar/Navbar'));
export const DataContext = createContext();

function App() {
  const [product, setProduct] = useState([]);
  const [logos, setLogos] = useState([]);

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

  return (
    <DataContext.Provider value={[product, setProduct, logos, setLogos]}>
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
