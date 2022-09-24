import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Box, Button, createTheme, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';

const theme = createTheme({
  palette: {
    orange: {
      main: '#fcb941',
      contrastText: '#000',
    },
  },
});

const CheckOut = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [count, setCount] = useState(0);
  const [invisible, setInvisible] = useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box component={"div"} sx={{cursor: "pointer", ml: 2}} onClick={handleOpen}>
        <Badge color={'orange'} badgeContent={count} max={10} invisible={invisible}>
          <ShoppingCartOutlinedIcon  />
        </Badge>
      </Box>
    </ThemeProvider>
  );
}

export default CheckOut;
