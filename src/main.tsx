import React from "react";
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
import { LoginPage } from "./pages/LoginPage.tsx";

import { Auth0Provider } from "@auth0/auth0-react";
import { SearchResultPage } from "./pages/SearchResultPage.tsx";
import { Favorite } from "./components/Favorite.tsx";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const domain = import.meta.env.REACT_APP_AUTH0_DOMAIN;
console.log("domain", domain);
const clientId = import.meta.env.REACT_APP_CLIENT_ID;
console.log("clien", clientId);

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
      <Auth0Provider domain={domain} clientId={clientId}>
        <ThemeProvider theme={createTheme({ palette })}>
          <RouterProvider router={router} />
          <ToastContainer />
        </ThemeProvider>
      </Auth0Provider>
    </React.StrictMode>
  </Provider>
);
