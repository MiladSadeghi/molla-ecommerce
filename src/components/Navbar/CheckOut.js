import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Box, createTheme, ThemeProvider } from '@mui/material';
import React, { useState, useContext } from 'react';
import { DataContext } from 'App';
import { Link } from 'react-router-dom';
const theme = createTheme({
  palette: {
    orange: {
      main: '#fcb941',
      contrastText: '#000',
    },
  },
});

const CheckOut = () => {
  const [invisible, setInvisible] = useState(false);
  const {cartList} = useContext(DataContext);
  return (
    <ThemeProvider theme={theme}>
      <Link style={{color: "#fff", textDecoration: "none"}} to={"/cart"}>
        <Box component={"div"} sx={{cursor: "pointer", ml: 3, display: "flex", alignItems: "center", flexDirection: "column"}} >
          <Badge color={'orange'} badgeContent={cartList.length} max={10} invisible={invisible}>
            <ShoppingCartOutlinedIcon  />
          </Badge>
          <p style={{fontSize: "0.625rem", color: "#777", marginTop: "2px"}}>Cart</p>
        </Box>
      </Link>
    </ThemeProvider>
  );
}

export default CheckOut;
