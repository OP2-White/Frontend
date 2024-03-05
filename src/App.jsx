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
              Add food products
            </Link>
            <Link to={"calorieconsumption"} className="navigationLink">
              Estimated calorie consumption calculator
            </Link>
            <Link to={"foodconsumption"} className="navigationLink">
              your total Calories
            </Link>
          </nav>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
