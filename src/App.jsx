import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import MovieSearch from "./components/MovieSearch";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <MovieList />
            </PrivateRoute>
          }
        />

        <Route
          path="/movies"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <MovieList />
            </PrivateRoute>
          }
        />

        <Route
          path="/movie/:id"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <MovieDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/search"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <MovieSearch />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}
export default App