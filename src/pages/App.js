import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Users from "../components/UserList";
import LoginForm from "../components/LoginForm";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <Header onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
          {isLoggedIn && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-list" element={<Users />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
