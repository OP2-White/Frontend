import { useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function CalculateConsumption() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalSize, setTotalSize]=useState(0);
  const [totalProteins, setTotalProteins] =useState(0);
  const [totalCarbs, setTotalCarbs] =useState(0);
  const [totalSugar, setTotalSugar]=useState(0);

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
          setTotalProteins((currentTotal) => currentTotal + newFoodItem.protein_g);
          setTotalCarbs((currentTotal) => currentTotal + newFoodItem.carbohydrates_total_g);
          setTotalSugar((currentTotal) => currentTotal + newFoodItem.sugar_g);
          setTotalSize((currentTotal) => currentTotal + newFoodItem.serving_size_g);
          
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  const deleteFood = (indexToDelete) => {
    const itemToDelete = foodItems[indexToDelete];
    setFoodItems((currentItems) =>
      currentItems.filter((_, index) => index !== indexToDelete)
    );
    // Subtract the deleted item's values from totals
    setTotalCalories((currentTotal) => currentTotal - itemToDelete.calories);
    setTotalProteins((currentTotal) => currentTotal - itemToDelete.protein_g);
    setTotalCarbs((currentTotal) => currentTotal - itemToDelete.carbohydrates_total_g);
    setTotalSugar((currentTotal) => currentTotal - itemToDelete.sugar_g);
    setTotalSize((currentTotal) => currentTotal - itemToDelete.serving_size_g);
  };
  // creates circle diagram (npm install chart.js react-chartjs-2)
  const chartData = {
    labels: ['Calories', 'Protein', 'Carbs', 'Sugar'],
    datasets: [
      {
        label: 'Nutrition',
        data: [totalCalories, totalProteins, totalCarbs, totalSugar],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
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
            {item.name} - {item.serving_size_g}g serving size, {item.calories} calories, {item.protein_g}g protein, {item.carbohydrates_total_g}g carbs, {item.sugar_g}g sugar
            <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => deleteFood(index)}>  <FontAwesomeIcon icon={faCircleXmark} />  </button>
          </div>
          // button (npm install @fortawesome/free-solid-svg-icons)

        ))}
      </div>
      <div>Total Serving Size: {totalSize}g</div>
      <div>Total Calories: {totalCalories}</div>
      <div>Total Protein: {totalProteins}g</div>
      <div>Total Carbs: {totalCarbs}g</div>
      <div>Total Sugar: {totalSugar}g</div>
      <div style={{ width: '300px', height: '300px' }}>
      <Doughnut data={chartData} />
    </div>
    </>
  );
  
}
export default CalculateConsumption


/*
Luodaan repository käyttäjän syömisille. Jokaiselle repositorylle tallennetulle ruualle
annetaan automaattisesti arvoksi nykyinen päivämäärä. Päivän syömiset saadaan,
kun lajitellaan repositoryä päivämäärän mukaan
*/