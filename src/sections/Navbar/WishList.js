import { FavoriteBorder } from '@mui/icons-material';
import { Badge, Box, Button, createTheme, ThemeProvider } from '@mui/material';
import React, { useState, useContext } from 'react';
import { DataContext } from '../../App';

const theme = createTheme({
  palette: {
    orange: {
      main: '#fcb941',
      contrastText: '#000',
    },
  },
});

const WishList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [invisible, setInvisible] = useState(false);
  const data = useContext(DataContext);

  return (
    <ThemeProvider theme={theme}>
      <Box component={"div"} sx={{cursor: "pointer"}} onClick={handleOpen}>
        <Badge color={'orange'} badgeContent={data[4]?.length} max={10} invisible={invisible}>
          <FavoriteBorder  />
        </Badge>
      </Box>
    </ThemeProvider>
  );
}

export default WishList;
