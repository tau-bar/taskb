import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { PRODUCTION_BASE_URL } from '../utils/const';
import { Alert } from '@mui/material';
import { Stack } from '@mui/system';

const theme = createTheme();

const UrlShortenPage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [error, setError] = useState('');
  const [urlCode, setUrlCode] = useState('');
  const [shortened, setShortened] = useState('');

  const handleShorten = () => {
    setError('');
    setUrlCode('');
    if (longUrl === '') {
      setError('Error: No URL is provided.');
      return;
    }
    axios.post(`${PRODUCTION_BASE_URL}/api/url/create`, {
      "longUrl": longUrl
    }).then(res => {
      setUrlCode(res.data.urlCode)
      setShortened(`${PRODUCTION_BASE_URL}/api/url/${res.data.urlCode}`)
    }).catch((err) => {
      setError(err?.response?.data);
    })
  }

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
        <Box sx={{ width: "100%", mt: 3 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={(e) => setLongUrl(e.target.value)}
                value={longUrl}
                id="longUrl"
                label="Long url"
                name="longUrl"
              />
            </Grid>
          <Button
            fullWidth
            onClick={handleShorten}
            variant="contained"
            sx={{ width: 200, mt: 3, mb: 2 }}
          >
            Shorten!
          </Button>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {urlCode && <Alert severity="success">Successful! Your shortened URL: <a href={shortened}>{shortened}</a></Alert>}
          </Stack>
      </Box>
    </Box>
    </Container>
    </ThemeProvider>
  )
  
}

export default UrlShortenPage;