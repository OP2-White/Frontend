import { useEffect, useState } from "react";

function CalorieCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [activity, setActivity] = useState(1);
  const [consumption, setConsumption] = useState([]);

  useEffect(() => {
    const formula = 10 * weight + 6.25 * height - 5 * age + 5;
    setConsumption(formula * activity);
  }, [weight, height, age, activity]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="text"
        placeholder="Weight / kg"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        type="text"
        placeholder="Height / cm"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <select
        value={activity}
        onChange={(e) => setActivity(Number(e.target.value))}
      >
            
            <option value="1.2">Light</option>
            <option value="1.5">Avarage</option>
            <option value="1.8">Active</option>
            <option value="2.4">Very active</option>
            

        </select>
        
      
      <div>Daily caloric need: {consumption}</div>
    </div>
);
}
export default CalorieCalculator