import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

let currentDate = new Date();
let formattedCurrentDate = `${currentDate.getDate()}.${
  currentDate.getMonth() + 1
}.${currentDate.getFullYear()}`;

function CalculateConsumption() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [foodToSave, setFoodToSave] = useState({
    date: formattedCurrentDate,
    foodName: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
  });
  const [searchDone, setSearchDone] = useState(false);

  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  };

  //tallennettujen ruokien tallennus kantaan. Sitten tallennettujen ruokien haku ja suodatus päivän mukaan ja lasketaan päivän totaali kalorit donitsiin. 

  const searchFood = () => {
    fetch(`https://api.calorieninjas.com/v1/nutrition?query=${searchWord}`, {
      headers: {
        "X-Api-Key": "1NCL2QnaNfKPnwFzFlWyGQ==rtw2xVObNjB0h2tS",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCalories(data.items[0].calories);
        setProtein(data.items[0].protein_g);
        setCarbs(data.items[0].carbohydrates_total_g);
        setFat(data.items[0].fat_total_g);
        setSugar(data.items[0].sugar_g);
        setFoodName(data.items[0].name);
        setTotalSize(data.items[0].serving_size_g);

        setFoodToSave({
          date: formattedCurrentDate,
          foodName: data.items[0].name,
          calories: data.items[0].calories,
          protein: data.items[0].protein_g,
          carbs: data.items[0].carbohydrates_total_g,
          fat: data.items[0].fat_total_g,
          sugar: data.items[0].sugar_g,
        });
        setSearchDone(true);
      });
  };

  // const addFood = () => {
  //   fetch(`https://api.calorieninjas.com/v1/nutrition?query=${searchWord}`, {
  //     headers: {
  //       "X-Api-Key": "1NCL2QnaNfKPnwFzFlWyGQ==rtw2xVObNjB0h2tS",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.items && data.items.length > 0) {
  //         const newFoodItem = data.items[0];
  //         setFoodItems((currentItems) => [...currentItems, newFoodItem]);
  //         // Update total calories
  //         setTotalCalories(
  //           (currentTotal) => currentTotal + newFoodItem.calories
  //         );
  //         setTotalProteins(
  //           (currentTotal) => currentTotal + newFoodItem.protein_g
  //         );
  //         setTotalCarbs(
  //           (currentTotal) => currentTotal + newFoodItem.carbohydrates_total_g
  //         );
  //         setTotalSugar((currentTotal) => currentTotal + newFoodItem.sugar_g);
  //         setTotalSize(
  //           (currentTotal) => currentTotal + newFoodItem.serving_size_g
  //         );
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // const deleteFood = (indexToDelete) => {
  //   const itemToDelete = foodItems[indexToDelete];
  //   setFoodItems((currentItems) =>
  //     currentItems.filter((_, index) => index !== indexToDelete)
  //   );
  //   // Subtract the deleted item's values from totals
  //   setTotalCalories((currentTotal) => currentTotal - itemToDelete.calories);
  //   setTotalProteins((currentTotal) => currentTotal - itemToDelete.protein_g);
  //   setTotalCarbs(
  //     (currentTotal) => currentTotal - itemToDelete.carbohydrates_total_g
  //   );
  //   setTotalSugar((currentTotal) => currentTotal - itemToDelete.sugar_g);
  //   setTotalSize((currentTotal) => currentTotal - itemToDelete.serving_size_g);
  // };
  // creates circle diagram (npm install chart.js react-chartjs-2)

  // const chartData = {
  //   labels: ["Calories", "Protein", "Carbs", "Sugar"],
  //   datasets: [
  //     {
  //       label: "Nutrition",
  //       data: [totalCalories, totalProteins, totalCarbs, totalSugar],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.6)",
  //         "rgba(54, 162, 235, 0.6)",
  //         "rgba(255, 206, 86, 0.6)",
  //         "rgba(75, 192, 192, 0.6)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const saveToDatabase = async () => {
    try {
      const response = await fetch(
        "https://calorie-calculator-backend-c99d1a21f171.herokuapp.com/saveFoodEatenREST",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(foodToSave),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Data saved successfully");
    } catch (error) {
      console.error("Tallennusvirhe:", error.message);
    }
  };

  return (
    <>
      <div>
        <h1>Add eaten foods</h1>
        <input value={searchWord} onChange={handleInputChange} />
        <button onClick={() => searchFood()}>Search product</button>
      </div>
      <div>
        {searchDone && (
          <div>
            <h4>Name: {foodName}</h4>
            <h4>Portion size: {totalSize} g</h4>
            <h4>Calories: {calories}</h4>
            <h4>Protein: {protein}</h4>
            <h4>Carbs: {carbs}</h4>
            <h4>Fat: {fat}</h4>
            <h4>Sugar: {sugar}</h4>
            <button
              onClick={() => {
                saveToDatabase();
              }}
            >
              Save as eaten
            </button>
          </div>
        )}
      </div>
      {/* <div>Total Serving Size: {totalSize}g</div>
      <div>Total Calories: {totalCalories}</div>
      <div>Total Protein: {totalProteins}g</div>
      <div>Total Carbs: {totalCarbs}g</div>
      <div>Total Sugar: {totalSugar}g</div> */}
      {/* <div style={{ width: "300px", height: "300px" }}>
        <Doughnut data={chartData} />
      </div> */}
    </>
  );
}
export default CalculateConsumption;

/*
Luodaan repository käyttäjän syömisille. Jokaiselle repositorylle tallennetulle ruualle
annetaan automaattisesti arvoksi nykyinen päivämäärä. Päivän syömiset saadaan,
kun lajitellaan repositoryä päivämäärän mukaan
*/