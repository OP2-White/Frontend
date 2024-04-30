import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [newAppUser, setNewAppUser] = useState({
    username: "",
    passwordHash: "",
  });

  const handleInputChange = (event) => {
    setNewAppUser({ ...newAppUser, [event.target.name]: event.target.value });
  };

  const handleSignupClick = () => {
    fetch(
      "https://calorie-calculator-backend-c99d1a21f171.herokuapp.com/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppUser),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // if (data) {
        //   console.log("data is found");
        //   navigate("/profile", { state: { userData: data } });
        //   sessionStorage.setItem("isLoggedIn", "true");
        // }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setNewAppUser({
      username: "",
      passwordHash: "",
    });
  };
  return (
    <div className="signupPage">
      <h1>Fill in your information </h1>
      <div className="signupContainer">
        <h1>Signup</h1>
        <div className="signupInput">
          <h2>Username: </h2>
          <input
            type="text"
            name="username"
            value={newAppUser.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="signupInput">
          <h2>Password: </h2>
          <input
            type="password"
            name="passwordHash"
            value={newAppUser.passwordHash}
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="signupInput">
          <h2>Confirm password: </h2>
          <input
            type="password"
            name="password"
            value={newAppUser.passwordHash}
            onChange={handleInputChange}
          />
        </div> */}

        <div className="signupButton">
          <button onClick={handleSignupClick}>Signup</button>
        </div>
      </div>
    </div>
  );
}
export default Signup;
