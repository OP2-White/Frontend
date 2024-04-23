import React, { useState } from "react";
import axios from "axios";

function CalorieCalculator() {

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("2");
  const [goal, setGoal] = useState("maintain");

  const [result, setResult] = useState(null);

  const fetchCalories = async () => {
    const options = {
      method: "GET",
      url: "https://fitness-calculator.p.rapidapi.com/macrocalculator",
      params: {
        age,
        gender,
        height,
        weight,
        activitylevel: activityLevel,
        goal,
      },
      headers: {
        "X-RapidAPI-Key": "2b82c55899msh6afcc2df45e44fdp1af86bjsnbdbee975f31c",
        "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      window.alert("Please ensure the weight is a number between 40 kg and 160 kg, and the height is a number between 130 cm and 230 cm.")
    }
  };
  return (

    <div className="calorieConsumptionContainer">
      <div className="inputfieldsContainer">
        <h3>Age</h3>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
          placeholder="Age"
        />
        <h3>Gender</h3>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <h3>Height in cm</h3>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
          placeholder="Height in cm"
        />
        <h3>Weight in kg</h3>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(parseInt(e.target.value))}
          placeholder="Weight in kg"
        />
        <h3>Activity level</h3>
        <select
          type="text"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          placeholder="Activity Level"
        >
          <option value="1"> BMR</option>
          <option value="2"> Little or no exercise</option>
          <option value="3"> 1-3 times/week</option>
          <option value="4"> 4-5 time/week</option>
          <option value="5"> daily</option>
          <option value="6"> intense</option>
          <option value="7"> very intence</option>
        </select>
        <h3>Goal</h3>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Goal"
        >
          <option value="maintain"> BMR</option>
          <option value="mildlose"> mildlose</option>
          <option value="weightlose"> weightlose</option>
          <option value="extremelose"> extremelose</option>
          <option value="mildgain"> mildgain</option>
        </select>
        <button onClick={fetchCalories}>Calculate</button>
      </div>

      {result && (
        <div className="resultsContainer">
          <div className="resultsHeaderContainer">
            <h2>
              Your daily estimated calorie consumption is{" "}
              {result.data.calorie.toFixed(2)} kcal
            </h2>
          </div>
          <div className="resultsDietHeaderContainer">
            <h2>Diet options</h2>
          </div>
          <div className="resultsDietsUpperContainer">
            <div className="resultsBalancedDietContainer">
              <h4>Balanced Diet</h4>
              <h5>Protein: {result.data.balanced.protein.toFixed(2)}g</h5>
              <h5>Fat: {result.data.balanced.fat.toFixed(2)}g</h5>
              <h5>Carbs: {result.data.balanced.carbs.toFixed(2)}g</h5>
            </div>
            <div className="resultsLowFatDietContainer">
              <h4>Low Fat Diet</h4>
              <h5>Protein: {result.data.lowfat.protein.toFixed(2)}g</h5>
              <h5>Fat: {result.data.lowfat.fat.toFixed(2)}g</h5>
              <h5>Carbs: {result.data.lowfat.carbs.toFixed(2)}g</h5>
            </div>
          </div>
          <div className="resultsDietsLowerContainer">
            <div className="resultsLowCarbDietContainer">
              <h4>Low Carb Diet</h4>
              <h5>Protein: {result.data.lowcarbs.protein.toFixed(2)}g</h5>
              <h5>Fat: {result.data.lowcarbs.fat.toFixed(2)}g</h5>
              <h5>Carbs: {result.data.lowcarbs.carbs.toFixed(2)}g</h5>
            </div>
            <div className="resultsHighProteinDietContainer">
              <h4>High Protein Diet</h4>
              <h5>Protein: {result.data.highprotein.protein.toFixed(2)}g</h5>
              <h5>Fat: {result.data.highprotein.fat.toFixed(2)}g</h5>
              <h5>Carbs: {result.data.highprotein.carbs.toFixed(2)}g</h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalorieCalculator;
