import { Container, Grid } from '@mui/material';
import React from 'react';
import logo from '../../images/logo-footer.png';
import styles from './Styles.module.scss'
import { IoCallOutline } from 'react-icons/io5'
import List from './List';
import payments from "../../images/payments.png"
const Footer = () => {
  return (
    <Container>
      <div className={styles.main}>
        <Grid container spacing={2}>
          <Grid item sm={6} lg={3} className={styles.grid1} paddingX={"16px"}>
            <img src={logo} alt="logo" />
            <p>Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.</p>
            <div className={styles.call}>
              <IoCallOutline />
              <h5>Got Question? Call us 24/7<br />
                <span>+0123 456 789</span>
              </h5>
            </div>
          </Grid>
          <Grid item sm={6} lg={3} className={styles.grids} paddingX={"16px"}>
            <List title="Useful Links" content={["About Molla", "Our Services", "How to shop on Molla", "FAQ", "Contact us"]}/>
          </Grid>
          <Grid item sm={6} lg={3} className={styles.grids} paddingX={"16px"}>
            <List title="Customer Service" content={["Payment Methods", "Money-back guarantee!", "Returns", "Shipping", "Terms and conditions", "Privacy Policy"]}/>
          </Grid>
          <Grid item sm={6} lg={3} className={styles.grids} paddingX={"16px"}>
            <List title="My Account" content={["Sign In", "View Cart", "My Wishlist", "Track My Order", "Help"]}/>
          </Grid>
        </Grid>
        <hr />
      </div>
      <hr />
      <div className={styles.bottom}>
        <p>Copyright © 2019 Molla Store. All Rights Reserved.</p>
        <img src={payments} alt="payment" />
      </div>
    </Container>
  );
}

export default Footer;
