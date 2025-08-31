import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          {/* Auth pages */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/add"
            element={isLoggedIn ? <AddRecipe /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/recipe/:id"
            element={isLoggedIn ? <RecipeDetails /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
