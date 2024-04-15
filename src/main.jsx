import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App.jsx";
import CreateProduct from "./components/CreateProduct.jsx";
import "./index.css";
import CalorieCalculator from "./components/CalculateYourConsumption.jsx";
import SearchProducts from "./components/SearchProducts.jsx";
import CalculateConsumption from "./components/TotalCalories.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <SearchProducts />,
        index: true,
      },
      {
        path: "search-products",
        element: <SearchProducts />,
      },
      {
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        path: "calorieconsumption",
        element: <CalorieCalculator />,
      },
      {
        path: "foodconsumption",
        element: <CalculateConsumption />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
