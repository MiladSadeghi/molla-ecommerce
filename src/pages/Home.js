import FreeShipping from "../sections/FreeShipping/FreeShipping";
import Featured from "../sections/Featured/Featured";
import Header from "../sections/Header/Header";
import DealsOutlet from "../sections/Deals&Outlet/Deals&Outlet";

function Home() {
  return (
    <>
      <Header />
      <Featured />
      <FreeShipping />
      <DealsOutlet />
    </>
  );
}

export default Home;
