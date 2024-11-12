import React from "react";
import NavBar from "./components/Navbar/NavBar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Staff from "./routes/staff/staff";
import Home from "./routes/home/home";
import Turnos from "./routes/turnos/turnos";
import Login from "./routes/login/login";
import Footer from "./components/footer/footer";
import Register from "./routes/register/Register";
import Profile from "./routes/profile/profile";

function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          <Route exact={true} path="/" element={<Home/>} />
          <Route exact={true} path="/staff" element={<Staff/>} />
          <Route exact={true} path="/turnos" element={<Turnos/>} />
          <Route exact={true} path="/login" element={<Login/>} />
          <Route exact={true} path="/Register" element={<Register/>} />
          <Route exact={true} path="/profile" element={<Profile/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
