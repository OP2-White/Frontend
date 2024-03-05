import { useEffect, useState } from "react";


function CreateProduct(){

    const [newProduct, setNewProduct] = useState({
        name: "",
        calories: 0,
        serving_size_g: 0,
        fat_total_g: 0,
        fat_saturated_g: 0,
        protein_g: 0,
        sodium_mg: 0,
        potassium_mg: 0,
        cholesterol_mg: 0,
        carbohydrates_total_g: 0,
        fiber_g: 0,
        sugar_g: 0
    })

    const [list, setList] = useState([]);

    const fields = [
        { name: 'name', label: 'Name' },
        { name: 'calories', label: 'Calories', },
        { name: 'serving_size_g', label: 'Serving Size (g)' },
        { name: 'fat_total_g', label: 'Total Fat (g)' },
        { name: 'fat_saturated_g', label: 'Saturated Fat (g)' },
        { name: 'protein_g', label: 'Protein (g)' },
        { name: 'sodium_mg', label: 'Sodium (mg)' },
        { name: 'potassium_mg', label: 'Potassium (mg)' },
        { name: 'cholesterol_mg', label: 'Cholesterol (mg)' },
        { name: 'carbohydrates_total_g', label: 'Total Carbohydrates (g)' },
        { name: 'fiber_g', label: 'Fiber (g)' },
        { name: 'sugar_g', label: 'Sugar (g)' },
    ];

    const renderFields = () => {
        return fields.map((field) => (
            <div key={field.name}>
                <label>
                    {field.label}:
                    <input
                        type="text"
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
            [name]: value
        }));
    };

    const addProduct = () =>{
        setList((prevList) => [...prevList, newProduct]);
        setNewProduct({
            name: "",
            calories: 0,
            serving_size_g: 0,
            fat_total_g: 0,
            fat_saturated_g: 0,
            protein_g: 0,
            sodium_mg: 0,
            potassium_mg: 0,
            cholesterol_mg: 0,
            carbohydrates_total_g: 0,
            fiber_g: 0,
            sugar_g: 0
    });
}

    useEffect(() => {
        console.log(list);
    }, [list]);
    
    return(
        <>
        <p>Create new product:</p>
            <form>
                {renderFields()}
            </form>
        <button onClick={addProduct}>Add Product</button>
        </>
    )
}

export default CreateProduct;