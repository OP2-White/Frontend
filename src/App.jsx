import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="homepage">
        <div className="navigation">
          <nav>
            <Link to={"/"} className="navigationLink">
              Home
            </Link>
            <Link to={"create-product"} className="navigationLink">
              Create product
            </Link>
            <Link to={"calorieconsumption"} className="navigationLink">
              Calorie consumption calculator
            </Link>
            <Link to={"foodconsumption"} className="navigationLink">
              food Consumption
            </Link>
          </nav>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
