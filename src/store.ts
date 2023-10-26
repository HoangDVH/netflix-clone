import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie.slice";
import { movieApi } from "./apis/movie";
import { setupListeners } from "@reduxjs/toolkit/query";
// ...

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  //thêm api middleware để enable các tính năng như catching, invalidation,polling của rtk-querry
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
