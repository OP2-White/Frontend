import { useEffect, useState } from "react";

let currentDate = new Date();
let formattedCurrentDate = `${currentDate.getDate()}.${
  currentDate.getMonth() + 1
}.${currentDate.getFullYear()}`;

function CreateProduct() {
  const [newProduct, setNewProduct] = useState({
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    sugar: "",
  });
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

  //Lista jota käytetään tietokannan näyttämisessä.

  const [foodList, setFoodList] = useState([]);
  const [refreshList, setRefreshList] = useState(false);

  const fields = [
    { name: "foodName", label: "Name", type: "text" },
    { name: "calories", label: "Calories", type: "number" },
    { name: "protein", label: "Protein", type: "number" },
    { name: "carbs", label: "Carbs", type: "number" },
    { name: "fat", label: "Fat", type: "number" },
    { name: "sugar", label: "Sugar", type: "number" },
  ];

  const renderFields = () => {
    return fields.map((field) => (
      <div key={field.name}>
        <label>
          {field.label}:
          <input
            type={field.type}
            name={field.name}
            value={newProduct[field.name]}
            onChange={handleChange}
          />
        </label>
        <br />
      </div>
    ));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const saveToDatabase = async () => {
    try {
      const response = await fetch(
        "https://calorie-calculator-backend-c99d1a21f171.herokuapp.com/saveFoodREST",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Data saved successfully");
      setRefreshList(!refreshList);
      setNewProduct({
        foodName: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        sugar: "",
      });
    } catch (error) {
      console.error("Tallennusvirhe:", error.message);
    }
  };

  useEffect(() => {
    setAppUser(JSON.parse(sessionStorage.getItem("appUser")));
    const fetchFoodList = async () => {
      try {
        const response = await fetch(
          "https://calorie-calculator-backend-c99d1a21f171.herokuapp.com/foodListREST"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFoodList(data);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };
    fetchFoodList();
  }, [refreshList]);

  const saveEatenToDatabase = async (food) => {
    console.log(food);
    const requestBody = {
      date: formattedCurrentDate,
      foodName: food.foodName,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      sugar: food.sugar,
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

      console.log("Data saved successfully");

      // Alert user, that food is added to eaten products list
      alert(`Succesfully added ${food.foodName} as eaten.`);
    } catch (error) {
      console.error("Tallennusvirhe:", error.message);
    }
  };

  return (
    <div className="create-product">
      <div className="createProductContainer">
        <p>Create new product:</p>
        <form>{renderFields()}</form>
        <button onClick={() => saveToDatabase()}>Save</button>
      </div>
      <div className="list-product">
        <p>Previously created:</p>
        <ul>
          {foodList.map((food, index) => (
            <li key={index}>
              {food.foodName} - {food.calories} calories
              <button
                className="eat"
                onClick={() => {
                  saveEatenToDatabase(food);
                }}
              >
                Eat
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreateProduct;
