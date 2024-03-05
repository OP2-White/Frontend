import { useState } from "react";

function CalculateConsumption() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);

  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  };

  const addFood = () => {
    fetch(`https://api.calorieninjas.com/v1/nutrition?query=${searchWord}`, {
      headers: {
        "X-Api-Key": "1NCL2QnaNfKPnwFzFlWyGQ==rtw2xVObNjB0h2tS",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const newFoodItem = data.items[0];
          setFoodItems((currentItems) => [...currentItems, newFoodItem]);
          // Update total calories
          setTotalCalories((currentTotal) => currentTotal + newFoodItem.calories);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  const deleteFood = (indexToDelete) => {
    setFoodItems((currentItems) =>
      currentItems.filter((_, index) => index !== indexToDelete)
    );
    // Recalculate total calories
    const newTotalCalories = foodItems.reduce((total, item, index) => {
      if (index !== indexToDelete) {
        return total + item.calories;
      }
      return total;
    }, 0);
    setTotalCalories(newTotalCalories);
  };

  return (
    <>
      <div>
        <input value={searchWord} onChange={handleInputChange} />
        <button onClick={addFood}>Add Product</button>
      </div>
      <div>
        {foodItems.map((item, index) => (
          <div key={index}>
            {item.name} - {item.calories} calories
            <button onClick={() => deleteFood(index)}>Delete</button>
          </div>
        ))}
      </div>
      <div>Total Calories: {totalCalories}</div>
    </>
  );
}
export default CalculateConsumption


/*
Luodaan repository käyttäjän syömisille. Jokaiselle repositorylle tallennetulle ruualle
annetaan automaattisesti arvoksi nykyinen päivämäärä. Päivän syömiset saadaan,
kun lajitellaan repositoryä päivämäärän mukaan
*/