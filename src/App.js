import './App.css';
import Navbar from './components/NavBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <div className='container'>
          <Routes>
            <Route exact path="/home" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
