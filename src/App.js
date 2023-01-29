import "./App.css";
import Navbar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteContextProvider from "./context/notes/noteContext";
import Alert from "./components/Alert";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NoteContextProvider>
          <Navbar></Navbar>
          <Alert message="hello"></Alert>
          <div className="container">
            <Routes>
              <Route exact path="/home" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
            </Routes>
          </div>
        </NoteContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
