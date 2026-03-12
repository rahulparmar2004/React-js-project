import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../Redux/movieActions";
import { Link } from "react-router-dom";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { movies = [], loading } = useSelector((state) => state);

  useEffect(() => {
    if (query.trim() !== "") {
      dispatch(searchMovies(query));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, dispatch]);

  const handleSelect = () => {
    setShowDropdown(false);
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-8 text-yellow-400">
          🔎 Search Movies
        </h2>

        {/* Search Box */}
        <div className="relative flex justify-center mb-10">
          <input
            type="text"
            placeholder="Type movie name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/2 px-5 py-3 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
          />

          {/* Dropdown Cards */}
          {showDropdown && movies.length > 0 && (
            <div className="absolute top-14 md:top-14 left-0 right-0 md:w-1/2 mx-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-xl max-h-96 overflow-y-auto z-50">
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  onClick={handleSelect}
                  className="flex items-center px-4 py-3 hover:bg-yellow-400 hover:text-black transition rounded-xl"
                >
                  <img
                    src={movie.image || movie.poster}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded-lg mr-4 shadow-md"
                  />
                  <span className="truncate font-semibold">{movie.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-lg font-semibold text-yellow-400 animate-pulse mb-6">
            Searching...
          </div>
        )}

        {/* Full Results Grid */}
        {query.trim() !== "" && !showDropdown && movies.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-500"
              >
                <img
                  src={movie.image || movie.poster}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="p-4 relative z-10">
                  <h3 className="text-lg font-bold mb-3 truncate text-white">
                    {movie.title}
                  </h3>

                  <Link
                    to={`/movie/${movie.id}`}
                    className="block text-center bg-yellow-400 text-black py-2 rounded-full font-bold hover:bg-yellow-300 transition shadow-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && movies.length === 0 && query !== "" && (
          <div className="text-center mt-10 text-gray-400">
            No movies found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;