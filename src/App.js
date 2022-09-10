import { CssBaseline } from '@mui/material';
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
const Home = lazy(() => import('./pages/Home'));
const Navbar = lazy(() => import('./sections/Navbar/Navbar'));

function App() {
  return (
    <div>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
