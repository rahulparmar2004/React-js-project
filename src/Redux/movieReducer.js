const initialState = {
  movies: [],
  movieDetails: null,
  loading: false,
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };

    case "FETCH_MOVIE_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        movieDetails: action.payload,
      };

    case "FETCH_MOVIES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default movieReducer;