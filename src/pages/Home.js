import FreeShipping from "../sections/FreeShipping/FreeShipping";
import Featured from "../sections/Featured/Featured";
import Header from "../sections/Header/Header";
import DealsOutlet from "../sections/Deals&Outlet/Deals&Outlet";
import Companies from "../sections/Companies/Companies";
import TrendingProducts from "../sections/TrendingProducts/TrendingProducts";
import TopSellingProducts from "../sections/TopSellingProducts/TopSellingProducts";

function Home() {
  return (
    <>
      <Header />
      <Featured />
      <FreeShipping />
      <DealsOutlet />
      <Companies />
      <TrendingProducts />
      <TopSellingProducts />
    </>
  );
}

export default Home;
