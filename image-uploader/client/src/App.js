import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { auth } from "./firebase";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => unsubscribe;
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={!user ? <Login /> : <Dashboard />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
    </Routes>
  );
}

export default App;
