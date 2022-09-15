import React from "react";
import UrlList from "../components/UrlList";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container } from "@mui/system";
import { CssBaseline, Typography } from "@mui/material";

const theme = createTheme();

const UrlListPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
      <Box sx={{ backgroundColor: 'primary.main', color: 'white', p: 3, width: '100%' }}>
        <Typography component="h1" variant="h5">
          Your Urls:
        </Typography>
      </Box>
      <UrlList/>
      </Box>
      </Container>
    </ThemeProvider>
    )
}

export default UrlListPage;