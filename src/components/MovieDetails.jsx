import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../Redux/movieActions";

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetails } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  if (!movieDetails)
    return (
      <div className="text-center mt-20 text-xl font-semibold text-yellow-400 animate-pulse">
        Loading movie details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-3xl shadow-2xl overflow-hidden md:flex">

        {/* Movie Poster */}
        <div className="md:w-1/3 relative">
          <img
            src={movieDetails.image || movieDetails.poster}
            alt={movieDetails.title}
            className="w-full h-full object-cover md:h-auto rounded-l-3xl shadow-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-l-3xl"></div>
        </div>

        {/* Movie Info */}
        <div className="md:w-2/3 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-yellow-400">
            {movieDetails.title}
          </h1>

          <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
            {movieDetails.overview || "No description available."}
          </p>

          {/* Movie Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 mb-6">
            <p>
              <span className="font-semibold text-yellow-400">Genre:</span>{" "}
              {movieDetails.genre || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-yellow-400">Release Date:</span>{" "}
              {movieDetails.releaseDate || movieDetails.release_date}
            </p>
            <p>
              <span className="font-semibold text-yellow-400">Cast:</span>{" "}
              {movieDetails.cast ? movieDetails.cast.join(", ") : "N/A"}
            </p>
            <p>
              <span className="font-semibold text-yellow-400">Rating:</span>{" "}
              {movieDetails.rating || "⭐ N/A"}
            </p>
          </div>

          <Link
            to="/movies"
            className="mt-4 inline-block bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition w-fit shadow-lg"
          >
            ← Back to Movies
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;