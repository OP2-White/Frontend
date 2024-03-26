import { useEffect, useState } from "react";

function CreateProduct() {
  const [newProduct, setNewProduct] = useState({
    foodName: "",
    calories: null,
    protein: null,
    carbs: null,
    fat: null,
    sugar: null,
  });

  const fields = [
    { name: "foodName", label: "Name", type: "text"},
    { name: "calories", label: "Calories", type: "number" },
    { name: "protein", label: "Protein", type: "number" },
    { name: "carbs", label: "Carbs", type: "number"},
    { name: "fat", label: "Fat" , type: "number"},
    { name: "sugar", label: "Sugar" , type: "number"},
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
  // pitää kattoo heroku postgre sql juttuja. ei toimi ku tulee error 500
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

  return (
    <div className="createProductContainer">
      <p>Create new product:</p>
      <form>{renderFields()}</form>
      <button onClick={() => saveToDatabase()}>Save</button>
    </div>
  );
}

export default CreateProduct;
