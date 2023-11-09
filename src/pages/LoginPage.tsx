import { useEffect, useState } from "react";
import { Login } from "../components/Login";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("user");
  //   if (token) {
  //     setIsAuthenticated(true);
  //     navigate("/browse");
  //   } else {
  //     setIsAuthenticated(false);
  //     navigate("/login");
  //   }
  // }, [navigate]);

  return (
    <div>
      <Login />
    </div>
  );
};
