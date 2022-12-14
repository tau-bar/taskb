import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import auth from '../config/firebaseConfig';
import { createUserWithEmailAndPassword  } from 'firebase/auth';
import axios from "axios"

const theme = createTheme();

const SignUpPage = () => {
  const [ emailError, setEmailError ] = useState("");
  const [ passwordError, setPasswordError ] = useState("");
  
  const handleSubmit = (event) => {
    setEmailError("");
    setPasswordError("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        await axios.post("localhost:8001/api/user/createUser", { uid: user.uid, username: user.username, role: "user" });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/weak-password") {
          setPasswordError("Password should be at least 6 characters ");
          return;
        }

        if (errorCode === "auth/email-already-in-use") {
          setEmailError("Email already in use")
          return;
        }

        if (errorCode === "auth/invalid-email") {
          setEmailError("Invalid email");
          return;
        }
      });
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={emailError !== ""}
                  helperText={emailError}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordError !== ""}
                  helperText={passwordError}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpPage;