import React from "react";
import NavBar from "./components/Navbar/NavBar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div>
        <Router>
            <NavBar />
            <Routes>
                <Route path={'/'} exact />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
