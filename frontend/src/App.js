import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UrlShortenPage from './pages/UrlShortenPage';
import UrlListPage from './pages/UrlListPage';

function App() {
  return (
    <div className='App'>
    <Router>
    <Routes>
        <Route exact path="/list" element={<UrlListPage />} />
      </Routes>
      <Routes>
      <Route path="/" element={<UrlShortenPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
