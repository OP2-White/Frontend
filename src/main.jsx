import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CreateProduct from "./components/CreateProduct.jsx";
import "./index.css";
import CalorieCalculator from "./components/kalorilaskuri.jsx";
import SearchProducts from "./components/SearchProducts.jsx";

const router = createBrowserRouter([
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
