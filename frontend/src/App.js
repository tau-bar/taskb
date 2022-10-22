import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import UrlShortenPage from './pages/UrlShortenPage';
import UrlListPage from './pages/UrlListPage';
import Navbar from './components/Navbar';
import auth from './config/firebaseConfig';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, setUserId, setUsername } from './redux/userSlice';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

function App() {

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [ isLoading, setIsLoading ] = useState(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUsername({ username: user.email }));
		  dispatch(setUserId({ userId: user.uid }));
    }

    setIsLoading(false);

  })

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    )
  }

    return (
      <div className='App'>
        <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignUpPage />} />
            <Route exact path="/list" element={<UrlListPage />} />
            <Route path="/" element={<UrlShortenPage />} />
            <Route
                      path="*"
                      element={<Navigate to="/" replace />}
            />
          </Routes>
        </Router>
      </div>
    )
}

export default App;
