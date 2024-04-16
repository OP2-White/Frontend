import React, { useState } from 'react';
import axios from 'axios';

function CalorieCalculator() {

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [activityLevel, setActivityLevel] = useState('2');
  const [goal, setGoal] = useState('maintain');
  const [result, setResult] = useState(null);


  const fetchCalories = async () => {
    const options = {
      method: 'GET',
      url: 'https://fitness-calculator.p.rapidapi.com/macrocalculator',
      params: { age, gender, height, weight, activitylevel: activityLevel, goal },
      headers: {
        'X-RapidAPI-Key': '2b82c55899msh6afcc2df45e44fdp1af86bjsnbdbee975f31c',
        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height in cm" />
      <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight in kg" />
      <select type="text" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} placeholder="Activity Level" >
        <option value="1"> BMR</option>
        <option value="2"> Little or no exercise</option>
        <option value="3"> 1-3 times/week</option>
        <option value="4"> 4-5 time/week</option>
        <option value="5"> daily</option>
        <option value="6"> intense</option>
        <option value="7"> very intence</option>
      </select>
      <select value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Goal" >
      <option value="maintain"> BMR</option>
      <option value="mildlose"> mildlose</option>
      <option value="weightlose"> weightlose</option>
      <option value="extremelose"> extremelose</option>
      <option value="mildgain"> mildgain</option>

      </select>
      <button onClick={fetchCalories}>Calculate</button>
      {result && (
        <div>
          <h3>Result:</h3>
          <div>Calories: {result.data.calorie.toFixed(2)}</div>
          <h4>Balanced Diet:</h4>
          <div>Protein: {result.data.balanced.protein.toFixed(2)}g</div>
          <div>Fat: {result.data.balanced.fat.toFixed(2)}g</div>
          <div>Carbs: {result.data.balanced.carbs.toFixed(2)}g</div>
          <h4>Low Fat Diet:</h4>
          <div>Protein: {result.data.lowfat.protein.toFixed(2)}g</div>
          <div>Fat: {result.data.lowfat.fat.toFixed(2)}g</div>
          <div>Carbs: {result.data.lowfat.carbs.toFixed(2)}g</div>
          <h4>Low Carb Diet:</h4>
          <div>Protein: {result.data.lowcarbs.protein.toFixed(2)}g</div>
          <div>Fat: {result.data.lowcarbs.fat.toFixed(2)}g</div>
          <div>Carbs: {result.data.lowcarbs.carbs.toFixed(2)}g</div>
          <h4>High Protein Diet:</h4>
          <div>Protein: {result.data.highprotein.protein.toFixed(2)}g</div>
          <div>Fat: {result.data.highprotein.fat.toFixed(2)}g</div>
          <div>Carbs: {result.data.highprotein.carbs.toFixed(2)}g</div>
        </div>
      )}
    </div>
  );
}

export default CalorieCalculator;
