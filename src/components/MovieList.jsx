import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "../Redux/movieActions";
import { Link } from "react-router-dom";

function MovieList() {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state);

  const [category, setCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  const categories = ["All", "Action", "Drama", "Sci-Fi", "Crime", "Romance", "Animation"];

  const filteredMovies =
    category === "All"
      ? movies
      : movies.filter((movie) => movie.genre === category);

  if (loading)
    return (
      <h2 className="text-center text-3xl font-bold mt-10 text-yellow-400 animate-pulse">
        Loading...
      </h2>
    );

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">

      {/* Sidebar Category */}
      <div className="w-60 bg-gray-800 p-6 hidden md:block mt-5">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Categories</h2>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`block w-full text-left px-4 py-2 rounded-lg mb-3 transition ${
              category === cat
                ? "bg-yellow-400 text-black font-bold"
                : "hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Movies Section */}
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          {category} Movies
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />

                {movie.popular && (
                  <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ Popular
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-1">{movie.title}</h2>

                <p className="text-gray-400 text-sm mb-2">
                  {movie.genre} • {movie.releaseDate}
                </p>

                <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                  {movie.overview}
                </p>

                <Link
                  to={`/movie/${movie.id}`}
                  className="inline-block bg-yellow-400 text-black font-semibold px-5 py-2 rounded-full hover:bg-yellow-500"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;