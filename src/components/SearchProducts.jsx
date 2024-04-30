import { useState, useEffect } from "react";
import CalculateConsumption from "./TotalCalories";

export default function SearchProducts() {
  //APIDOCUMENTATION: https://calorieninjas.com/api

  const [searchResult, setSearchResult] = useState({});
  const [searchWord, setSearchWord] = useState("");
  const [searchComplete, setSearchComplete] = useState(false);

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
      .then((data) => setSearchResult(data.items[0]))
      .then((data) => setSearchComplete(true));
    console.log(searchResult);
    let userInformation = JSON.parse(sessionStorage.getItem("appUser"));
  };
  return (
    <>
      <div className="searchProductsContainer">
        <h1>Search foods</h1>
        <div className="searchBarContainer">
          <input
            value={searchWord}
            onChange={(event) => handleInputChange(event)}
          />
          <button
            className="searchProductsSearchButton"
            onClick={() => search()}
          >
            Search
          </button>
        </div>
        {searchComplete && (
          <div className="searchResultsContainer">
            <div className="searchResultsLeftSide">
              <p>Amount: {searchResult.serving_size_g} g</p>
              <p>Calories: {searchResult.calories} kcal</p>
              <p>Total fat: {searchResult.fat_total_g} g</p>
              <p>Saturated fat: {searchResult.fat_saturated_g} g</p>
              <p>Protein: {searchResult.protein_g} g</p>
            </div>
            <div className="searchResultsRightSide">
              <p>Potassium: {searchResult.potassium_mg} mg</p>
              <p>Cholesterol: {searchResult.cholesterol_mg} mg</p>
              <p>Carbohydrates: {searchResult.carbohydrates_total_g} g</p>
              <p>Fiber: {searchResult.fiber_g} g</p>
              <p>Sugar: {searchResult.sugar_g} g</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
