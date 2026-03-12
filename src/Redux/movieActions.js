import movies from "../movie";

// Fetch All Movies
export const fetchPopularMovies = () => (dispatch) => {
  dispatch({ type: "FETCH_MOVIES_REQUEST" });

  setTimeout(() => {
    dispatch({
      type: "FETCH_MOVIES_SUCCESS",
      payload: movies,
    });
  }, 500);
};

// Fetch Single Movie
export const fetchMovieDetails = (id) => (dispatch) => {
  dispatch({ type: "FETCH_MOVIES_REQUEST" });

  const movie = movies.find((m) => m.id === Number(id));

  if (movie) {
    dispatch({
      type: "FETCH_MOVIE_DETAILS_SUCCESS",
      payload: movie,
    });
  } else {
    dispatch({
      type: "FETCH_MOVIES_ERROR",
      payload: "Movie not found",
    });
  }
};

// Search Movies
export const searchMovies = (query) => (dispatch) => {
  dispatch({ type: "FETCH_MOVIES_REQUEST" });

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  setTimeout(() => {
    dispatch({
      type: "FETCH_MOVIES_SUCCESS",
      payload: filteredMovies,
    });
  }, 400);
};