import { createSlice } from "@reduxjs/toolkit";
interface MovieState {
  movieId: string;
}

const initialState: MovieState = {
  movieId: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
});

const movieReducer = movieSlice.reducer;
export default movieReducer;
