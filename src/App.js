import { CssBaseline } from '@mui/material';
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import { useState, createContext, useEffect } from 'react';
import { db } from './components/Firebase';
import { onValue, ref } from 'firebase/database';
const Home = lazy(() => import('./pages/Home'));
const Navbar = lazy(() => import('./sections/Navbar/Navbar'));
export const DataContext = createContext();

function App() {
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    const products = ref(db, '/products');
    onValue(products, (snapshot) => {
      const data = snapshot.val();
      setDatabase(data)
    });
  }, [])

  return (
    <DataContext.Provider value={[database, setDatabase]}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Home />
      </Suspense>
    </DataContext.Provider>
  );
}

export default App;
