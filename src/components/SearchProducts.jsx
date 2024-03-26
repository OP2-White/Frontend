import { useState, useEffect } from "react";

export default function SearchProducts() {
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
      <div className="searchProductsContainer">
        <div>
          <input
            value={searchWord}
            onChange={(event) => handleInputChange(event)}
          />
          <button className="searchButton" onClick={() => search()}>Search</button>
        </div>

        <p>Name : {searchResult.name}</p>
        <p>Calories: {searchResult.calories}</p>
        <p>Serving size_g: {searchResult.serving_size_g}</p>
        <p>Fat total_g: {searchResult.fat_total_g}</p>
        <p>Fat saturated_g: {searchResult.fat_saturated_g}</p>
        <p>Protein_g: {searchResult.protein_g}</p>
        <p>Sodium_mg: {searchResult.sodium_mg}</p>
        <p>Potassium_mg: {searchResult.potassium_mg}</p>
        <p>Cholesterol_mg: {searchResult.cholesterol_mg}</p>
        <p>Carbohydrates total_g: {searchResult.carbohydrates_total_g}</p>
        <p>Fiber_g: {searchResult.fiber_g}</p>
        <p>Sugar_g: {searchResult.sugar_g}</p>
      </div>
    </>
  );
}
