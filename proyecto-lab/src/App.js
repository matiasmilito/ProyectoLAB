import React from "react";
import NavBar from "./components/Navbar/NavBar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Staff from "./components/Staff";
import Home from "./components/Home";
import Sanatorio from "./components/Sanatorio";
import Turnos from "./components/Turnos";
import Login from "./components/Login";

function App() {
  return (
        <Router>
            <div>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/sanatorio" element={<Sanatorio/>} />
                    <Route path="/staff" element={<Staff/>} />
                    <Route path="/turnos" element={<Turnos/>} />
                    <Route path="/login" element={<Login/>} />
                </Routes>
            </div>
        </Router>
  );
}

export default App;
