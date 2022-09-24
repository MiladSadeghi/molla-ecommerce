import { Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { HiOutlinePhone } from 'react-icons/hi';
import styles from "./Styles.module.scss";

const Call = () => {
  return (
    <Box>
      <Toolbar
        disableGutters
        variant="dense"
        sx={{minHeight: "100%"}}>
        <Typography
          variant="h1" 
          component="h2"
          fontSize={".9rem"}
          fontWeight={300}
          className={styles.topHover} >
          <Box 
            marginRight={"7px"} 
            alignItems={"center"} >
            <HiOutlinePhone fontSize={"1rem"} />
          </Box>
          Call: +0123 456 789
        </Typography>
      </Toolbar>
    </Box>
  );
}

export default Call;
