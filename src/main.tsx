import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "./theme/palette";
import { store } from "./store/store.ts";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Notification from "./components/Notification/Notification.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={createTheme({ palette })}>
          <Notification/>
          <App />
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
