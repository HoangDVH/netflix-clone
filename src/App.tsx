import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import {  setUser } from "./store/authSlice";

function App() {
  const distpatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  useEffect(() => {
    distpatch(setUser(user));
  }, []);

  return <></>;
}

export default App;
