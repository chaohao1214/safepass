import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegis from "./pages/LoginRegis";
import Dashboard from "./pages/Dashboard";
import { NotificationProvider } from "./components/NotificationProvider";

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginRegis />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </Router>
    </NotificationProvider>
  );
}

export default App;
