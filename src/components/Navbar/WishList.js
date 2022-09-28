import { FavoriteBorder } from '@mui/icons-material';
import { Badge, Box, createTheme, ThemeProvider } from '@mui/material';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from 'App';

const theme = createTheme({
  palette: {
    orange: {
      main: '#fcb941',
      contrastText: '#000',
    },
  },
});

const WishList = () => {
  const [invisible, setInvisible] = useState(false);
  const {wishList} = useContext(DataContext);

  return (
    <ThemeProvider theme={theme}>
      <Link style={{color: "#fff", textDecoration: "none"}} to={"/wishlist"}>
        <Box component={"div"} sx={{cursor: "pointer", display: "flex", alignItems: "center", flexDirection: "column"}}>
          <Badge color={'orange'} badgeContent={wishList?.length} max={10} invisible={invisible}>
            <FavoriteBorder  />
          </Badge>
          <p style={{fontSize: "0.625rem", color: "#777", marginTop: "2px"}}>Wishlist</p>
        </Box>
      </Link>
    </ThemeProvider>
  );
}

export default WishList;
