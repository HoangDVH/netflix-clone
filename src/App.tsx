import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setUser } from "./store/authSlice";
import useRouteElements from "./router/Router";

function App() {
  const routeElements = useRouteElements();
  const distpatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    distpatch(setUser(user));
  }, [distpatch, user]);

  return <> {routeElements}</>;
}

export default App;
