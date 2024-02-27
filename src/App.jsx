import { useState, useEffect } from "react";

import "./App.css";

function App() {
  //APIDOCUMENTATION: https://calorieninjas.com/api

  const [searchResult, setSearchResult] = useState({});
  const [searchWord, setSearchWord] = useState("");

  // useEffect(() => {
  //   fetch("https://api.calorieninjas.com/v1/nutrition?query=banana", {
  //     headers: {
  //       "X-Api-Key": "1NCL2QnaNfKPnwFzFlWyGQ==rtw2xVObNjB0h2tS",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setSearchResult(data.items[0]));
  // }, []);

  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  };

  const search = () => {
    fetch(`https://api.calorieninjas.com/v1/nutrition?query=${searchWord}`, {
      headers: {
        "X-Api-Key": "1NCL2QnaNfKPnwFzFlWyGQ==rtw2xVObNjB0h2tS",
      },
    })
      .then((response) => response.json())
      .then((data) => setSearchResult(data.items[0]));
      console.log(searchResult);
  };
  
  return (
    <>
      <div style={{ height: "100vh" }}>
        <div>
          <input
            value={searchWord}
            onChange={(event) => handleInputChange(event)}
          />
          <button onClick={() => search()}>search</button>
        </div>

        <p>name : {searchResult.name}</p>
        <p>calories: {searchResult.calories}</p>
        <p>serving_size_g: {searchResult.serving_size_g}</p>
        <p>fat_total_g: {searchResult.fat_total_g}</p>
        <p>fat_saturated_g: {searchResult.fat_saturated_g}</p>
        <p>protein_g: {searchResult.protein_g}</p>
        <p>sodium_mg: {searchResult.sodium_mg}</p>
        <p>potassium_mg: {searchResult.potassium_mg}</p>
        <p>cholesterol_mg: {searchResult.cholesterol_mg}</p>
        <p>carbohydrates_total_g: {searchResult.carbohydrates_total_g}</p>
        <p>fiber_g: {searchResult.fiber_g}</p>
        <p>sugar_g: {searchResult.sugar_g}</p>
        <p>perkele</p>

      </div>
    </>
  );
}

export default App;
