import { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // navigate-koukun käyttö
  const [loginData, setLoginData] = useState({
    username: "",
    passwordHash: "",
  });

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/search-products"); // Ohjaa käyttäjän SearchProducts-sivulle, jos hän on jo kirjautunut sisään
    }
  }, []);

  const handleInputChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleLogin = () => {
    fetch(
      "https://calorie-calculator-backend-c99d1a21f171.herokuapp.com/checkLoginRequest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            window.alert("Wrong username or password!");
            throw new Error("Unauthorized: Wrong username or password");
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log(data);
          sessionStorage.setItem("appUser", JSON.stringify(data));
          sessionStorage.setItem("isLoggedIn", "true");
          navigate("/search-products"); // Ohjaa käyttäjän SearchProducts-sivulle kirjautumisen jälkeen
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="loginpage">
      <div className="pleaselogin">
        <h1>Login to your profile to access all features</h1>
      </div>
      <div className="loginform">
        <div className="loginheader">
          <h1>Login</h1>
        </div>

        <div className="username">
          <h3>Username</h3>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="password">
          <h3>Password</h3>
          <input
            type="password"
            name="passwordHash"
            value={loginData.passwordHash}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="loginButton">
          <button onClick={handleLogin}>Login</button>
        </div>
        <Link to={"/signup"} className="signupLink">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
