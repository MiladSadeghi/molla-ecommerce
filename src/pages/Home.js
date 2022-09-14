import FreeShipping from "../sections/FreeShipping/FreeShipping";
import Featured from "../sections/Featured/Featured";
import Header from "../sections/Header/Header";
import DealsOutlet from "../sections/Deals&Outlet/Deals&Outlet";
import Companies from "../sections/Companies/Companies";

function Home() {
  return (
    <>
      <Header />
      <Featured />
      <FreeShipping />
      <DealsOutlet />
      <Companies />
    </>
  );
}

export default Home;
