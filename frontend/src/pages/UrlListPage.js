import React, { useEffect, useState } from "react";
import UrlList from "../components/UrlList";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Stack } from "@mui/system";
import { Alert, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import { PRODUCTION_BASE_URL } from "../utils/const";

const theme = createTheme();

const UrlListPage = () => {  
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    handleGetList();
  }, []);

  const handleGetList = () => {
    setError('');
    setMessage('');
    axios.get(`${PRODUCTION_BASE_URL}/api/url/all`)
    .then(res => {
      setList(res.data)
    }).catch((err) => {
      setError(err);
    })
  }

  const handleDelete = (code, idx) => {
    setError('');
    setMessage('');
    axios.delete(`${PRODUCTION_BASE_URL}/api/url/delete/${code}`, { crossDomain: true })
    .then(res => {
      list.splice(idx, 1);
      setList(list);
      setMessage(res.data)
    }).catch((err) => {
      setError(err.data);
    })
  }

  const handleEdit = (code, idx, newUrl) => {
    setError('');
    setMessage('');
    axios.put(`${PRODUCTION_BASE_URL}/api/url/update/${code}`, {
      "longUrl": newUrl
  }, { crossDomain: true })
    .then(res => {
      list[idx].longUrl = newUrl
      setList(list);
      setMessage(res.data)
    }).catch((err) => {
      setError(err.response.data);
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
      <Stack sx={{ width: '100%', py: 1 }} spacing={2}>
      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="success">{message}</Alert>}
      </Stack>
      <Box sx={{ backgroundColor: 'primary.main', color: 'white', p: 3, width: '100%' }}>
        <Typography component="h1" variant="h5">
          Your Urls:
        </Typography>
      </Box>
      <UrlList list={list} handleDelete={(code, idx) => handleDelete(code, idx)} handleEdit={handleEdit}/>
      </Box>
      </Container>
    </ThemeProvider>
    )
}

export default UrlListPage;