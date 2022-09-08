import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const theme = createTheme({
    typography: {
        fontFamily: ["Poppins"].join(","),
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.Fragment>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.Fragment>
);
