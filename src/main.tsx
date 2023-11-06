import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./pages/MainPage.tsx";
import { Provider } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "./theme/palette";
import { store } from "./store/store.ts";

import { WatchVideoPage } from "./pages/WatchVideoPage.tsx";

import { MovieListPage } from "./pages/MovieListPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";

import { SearchResultPage } from "./pages/SearchResultPage.tsx";
import { Favorite } from "./components/Favorite.tsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/browse",
    element: <MainPage />,
  },

  {
    path: "/:movieId",
    element: <MainPage />,
  },
  {
    path: "/:movieId/watch",
    element: <WatchVideoPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/genre/:title",
    element: <MovieListPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/search",
    element: <SearchResultPage />,
  },
  {
    path: "/favorite",
    element: <Favorite />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={createTheme({ palette })}>
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
