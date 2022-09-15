import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'

const theme = createTheme();

const UrlShortenPage = () => {

  // const handleShorten = () => {
  //   axios.post(`localhost:8001/api/url/create`)
  //     .then(res => {
  //       console.log(res)
  //     })
  // }

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
        <Typography component="h1" variant="h3">
          Enter your long url here:
        </Typography>
        <Box component="form" onSubmit={() => {}} sx={{ width: "100%", mt: 3 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="longUrl"
                label="Long url"
                name="longUrl"
              />
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ width: 200, mt: 3, mb: 2 }}
          >
            Shorten!
          </Button>
      </Box>
    </Box>
    </Container>
    </ThemeProvider>
  )
  
}

export default UrlShortenPage;