import { ArrowRightAlt } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, { memo, useContext } from 'react';
import styles from "./Styles.module.scss";
import { DataContext } from "App";
import ProductCard from 'components/ProductCard/ProductCard';
import Counter from './Counter';
import { Link } from 'react-router-dom';
const DealsOutlet = () => {
  const {product} = useContext(DataContext);
  
  return (
    <div className={styles.main}>
      <Container>
        <div className={styles.top}>
          <h1>Deals & Outlet</h1>
          <p>Today’s deal and more</p>
        </div>
        <div className={styles.body}>
          <div className={styles.father}>
            <div  className={styles.ghPic}>
              <div className={styles.body1}>
                <h2>Deal of the Day.</h2>
                <h4>Limited quantities.</h4>
              </div>
              <div className={styles.body2}>
                <p className={styles.title}>Home Smart Speaker with  Google Assistant</p>
                <p>$129.00 <span>Was $150.99</span></p>
                <Link to={`product/78040670`}>
                  Shop Now 
                  <ArrowRightAlt sx={{ml: ".7rem", fontSize: 22, verticalAlign: "middle"}} /> 
                </Link>
              </div>
              <Counter />
            </div>
            <div className={styles.rightProducts}>
              <div className={styles.rightProduct}>
                {
                  Object.keys(product).length > 0 && 
                  <ProductCard data={product["15080249"]} sty={{height: "100%"}} >
                    <span>Was $3,599.99</span>
                  </ProductCard>
                }
              </div>
              <div className={styles.rightProduct}>
                {
                  Object.keys(product).length > 0 && 
                  <ProductCard data={product["48411537"]} sty={{height: "100%"}}>
                    <span>Was $200.99</span>
                  </ProductCard>
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default memo(DealsOutlet);
