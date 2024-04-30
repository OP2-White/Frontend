import { useEffect, useState } from "react";
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

  // HUOM tähän pitäisi saada kirjautuneen käyttäjän tiedot jotta syöty ruoka tallentuu kirjautuneelle käyttäjälle.
  const [appUser, setAppUser] = useState({
    userId: null,
    username: "",
    passwordHash: "",
  });
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
  const [rerenderer, setRerenderer] = useState(false);
  const [eatenFoods, setEatenFoods] = useState([]);
  const [fetched, setFetched] = useState(false);
  //https://calorie-calculator-backend-c99d1a21f171.herokuapp.com/foodEaten/users/${appUser.userID}
  useEffect(() => {
    setAppUser(JSON.parse(sessionStorage.getItem("appUser")));
    let usersData = JSON.parse(sessionStorage.getItem("appUser"));
    console.log(sessionStorage.getItem("appUser"));
    let filteredArray = [];
    fetch(
      `https://calorie-calculator-backend-c99d1a21f171.herokuapp.com/foodEaten/users/${usersData.userId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          if (item.date === formattedCurrentDate) {
            filteredArray.push(item);
          }
        });
        setEatenFoods(filteredArray);
        console.log(appUser);
      });

    setFetched(true);
  }, [rerenderer]);

  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  };

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

  const saveToDatabase = async () => {
    console.log(foodToSave); // Check if foodToSave is defined
    console.log(appUser);

    const requestBody = {
      date: foodToSave.date,
      foodName: foodToSave.foodName,
      calories: foodToSave.calories,
      protein: foodToSave.protein,
      carbs: foodToSave.carbs,
      fat: foodToSave.fat,
      sugar: foodToSave.sugar,
      appUser: appUser,
    };

    try {
      const response = await fetch(
        "https://calorie-calculator-backend-c99d1a21f171.herokuapp.com/saveFoodEatenREST",
        {
          method: "POST",
          headers: {
            // Set the Content-Type header to application/json
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody), // Convert the request body to JSON
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setRerenderer(!rerenderer);
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Tallennusvirhe:", error.message);
    }
  };

  return (
    <div className="totalCaloriesContainer">
      <div className="totalCaloriesSearchContainer">
        <div>
          <h1>Add eaten foods</h1>
          <input value={searchWord} onChange={handleInputChange} />
          <button onClick={() => searchFood()}>Search</button>
        </div>
        <div>
          {searchDone && (
            <div>
              <h4>
                {totalSize} g of {foodName} has
              </h4>

              <h4>{calories} Kcal</h4>
              <h4>{protein}g Protein</h4>
              <h4>{carbs}g Carbs</h4>
              <h4>{fat}g Fat</h4>
              <h4>{sugar}g Sugar</h4>
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
      </div>
      {fetched && (
        <div className="totalsContainer">
          <h1>Daily Totals</h1>
          <div>
            <h2>
              Total Calories:{" "}
              {eatenFoods.reduce((total, food) => total + food.calories, 0)}
            </h2>
          </div>
          <div>
            <h2>
              Total Protein:{" "}
              {eatenFoods.reduce((total, food) => total + food.protein, 0)}
            </h2>
          </div>
          <div>
            <h2>
              Total Carbs:{" "}
              {eatenFoods.reduce((total, food) => total + food.carbs, 0)}
            </h2>
          </div>
          <div>
            <h2>
              Total Fat:{" "}
              {eatenFoods.reduce((total, food) => total + food.fat, 0)}
            </h2>
          </div>
          <div>
            <h2>
              Total Sugar:{" "}
              {eatenFoods.reduce((total, food) => total + food.sugar, 0)}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
export default CalculateConsumption;

/*
Luodaan repository käyttäjän syömisille. Jokaiselle repositorylle tallennetulle ruualle
annetaan automaattisesti arvoksi nykyinen päivämäärä. Päivän syömiset saadaan,
kun lajitellaan repositoryä päivämäärän mukaan
*/
