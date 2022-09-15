import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import UrlShortenPage from './pages/UrlShortenPage';

function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route exact path="/" element={<UrlShortenPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
