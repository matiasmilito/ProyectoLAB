import React from "react";
import NavBar from "./components/Navbar/NavBar";
import {Routes, Route} from "react-router-dom";
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
    <div>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/staff" element={<Staff/>} />
        <Route exact path="/turnos" element={<Turnos/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/Register" element={<Register/>} />
        <Route exact path="/profile" element={<Profile/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
