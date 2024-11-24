import React from "react";
import NavBar from "./components/Navbar/NavBar";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Staff from "./routes/staff/staff";
import Home from "./routes/home/home";
import Turnos from "./routes/turnos/turnos";
import Login from "./routes/login/login";
import Footer from "./components/footer/footer";
import Register from "./routes/register/Register";
import Profile from "./routes/profile/profile";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <div>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/staff" element={<Staff/>} />
          <Route path="/turnos" element={<Turnos/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/Register" element={<Register/>} />
          <Route 
            path="/profile" 
            element={
              <AuthRoute>
                <Profile />
              </AuthRoute>
            } 
          />
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
