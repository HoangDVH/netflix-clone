// favorite.slice.ts

import { createSlice } from "@reduxjs/toolkit";
import { Movie } from "../types/Movie";

interface FavoriteState {
  movies: Movie[];
}

const initialState: FavoriteState = {
  movies: localStorage.getItem("favorite")
    ? JSON.parse(localStorage.getItem("favorite")!)
    : [],
};

const favorSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const existingMovie = state.movies.find(
        (movie) => movie.id === action.payload.id
      );

      if (!existingMovie) {
        state.movies.push({ ...action.payload, addedToFavor: true });
        localStorage.setItem("favorite", JSON.stringify(state.movies));
      }
    },
    removeFromFavorite: (state, action) => {
      const updatedMovies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
      state.movies = updatedMovies;
      localStorage.setItem("favorite", JSON.stringify(updatedMovies));
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favorSlice.actions;
export default favorSlice.reducer;
