import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
          Login
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition duration-300"
          >
            Login
          </button>
        </form>


      </div>
    </div>
  );
};

export default Login;