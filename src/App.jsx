import "./App.css";
import { Link, Navigate, Outlet } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProduct from "./components/CreateProduct";
import CalculateYourConsumption from "./components/CalculateYourConsumption";
import TotalCalories from "./components/TotalCalories";
import isLoggedIn from "./components/Login"
import { useNavigate } from "react-router-dom"; 

function App() {

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/search-products");
  };
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("isLoggedIn") === "true");

  return (
    <div className="homepage">
      <div className="navigation">
        <nav>
          <Link to={"/"} className="navigationLink">
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link to={"/create-product"} className="navigationLink">
                Add food products
              </Link>
              <Link to={"/calorieconsumption"} className="navigationLink">
                Estimated calorie consumption calculator
              </Link>
              <Link to={"/foodconsumption"} className="navigationLink">
                Your total Calories
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
          {!isLoggedIn && (
            <Link to={"/login"} className="navigationLink">
              Login
            </Link>
            )}
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
