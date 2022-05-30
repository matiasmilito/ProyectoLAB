import React from "react";
import NavBar from "./components/Navbar/NavBar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Staff from "./routes/staff/staff";
import Home from "./routes/home/home";
import Sanatorio from "./routes/sanatorio/sanatorio";
import Turnos from "./routes/turnos/turnos";
import Login from "./routes/login/login";

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
