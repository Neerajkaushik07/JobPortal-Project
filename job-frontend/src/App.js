import React from "react";

import { Routes, Route } from "react-router-dom";

import Register from "./login/Components/RegisterYup";
import ForgotPassword from "./login/Components/ForgotPassword";
import Mdashboard from "./login/Components/Mdashboard";
import { useEffect } from "react";
import Home from "./pages/Home";
import { Navbar } from "react-bootstrap";
import { ThemeProvider } from './ThemeContext';

function App() {

  return (
    <ThemeProvider>
    <Navbar/>
    <Routes>
      
      <Route path="/*" element={<Mdashboard />} />

      <Route path="/Login" element={<Mdashboard />} />

      <Route path="/Reset" element={<ForgotPassword />} />
    {/* <Route path="/" element={<Home />} /> */}
      <Route path="/Register" element={<Register />} />
      {/* <Route path="*" element={<Navigate to="/Login" />} /> */}
    </Routes>
    </ThemeProvider>
  );
}
export default App;
