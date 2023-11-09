import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie.slice";
import { movieApi } from "../apis/movie";
import { setupListeners } from "@reduxjs/toolkit/query";
import favorReducer from "./favorite.slice";
// ...

import authReducer from "../store/authSlice";
import { accountListApi } from "../apis/accountUser";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [accountListApi.reducerPath]: accountListApi.reducer,
    favorite: favorReducer,
  },
  //thêm api middleware để enable các tính năng như catching, invalidation,polling của rtk-querry
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      movieApi.middleware,
      accountListApi.middleware
    ),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
