import { Container, Grid } from '@mui/material';
import React from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "./Style.css";
import SideBanner from './SideBanner';
import HeaderBanner from './HeaderBanner';

const Header = () => {
  return (
    <Container sx={{my: "2rem"}}>
      <Grid container columnSpacing={3} >
        <Grid item lg={8} width={"100%"}>
          <HeaderBanner />
        </Grid>
        <Grid item lg={4} width={"100%"}>
          <SideBanner />
        </Grid>
      </Grid>

    </Container>
  );
}

export default Header;
