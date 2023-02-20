import './app.css';
import { useState, useEffect } from "react";
import Axios from 'axios'


function App() {
  const [foodName, setFoodName] = useState("")
  const [days, setDays] = useState("")
  const [result, setResult] = useState([])
  const [newFood, setNewFood]= useState('')

  useEffect(() => {
    (async () => {
      try {
        const res = await Axios.get("http://localhost:3001/show")
        //console.log(res)
        setResult(res.data)
      }
      catch (err) {
        console.log(err)
      }
    })() 
    },[])
    

    function addFood() {  
    Axios.post("http://localhost:3001/add", {
      foodName: foodName,
      days: days
    }).then(console.log(`${foodName}-${days}`))
    .catch(err=> console.log(err))
    }
  
  function updateFood(id) {
    Axios.put("http://localhost:3001/update", { 
      id: id,
      newFood: newFood
    }).then(console.log("updated"))
    .catch(err => console.log(err))
  }

  function deleteFood(id) {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }
  return (
    <div className="app">
      <h1>Basic CRUD with MERN</h1>
      <label>Name of the food</label>
      <input type="name" onChange={(e) => setFoodName(e.target.value)}></input>
      <label>Day since u ate</label>
      <input type="number" onChange={(e) => setDays(e.target.value)}></input>
      <button onClick={addFood}>Enter to the list</button>
      {result.map((res, index) => (
        <div key={index} className="foodList">
          <h2>{res.foodName}</h2>
          <h2>{res.daysSinceIAte}</h2>
          <div className="updateFood">
           <input
              placeholder="Enter new food name..."
              type="text"
              onChange={(e) =>setNewFood(e.target.value)}
            />
             <button className="updateBtn" onClick={()=>updateFood(res._id)}>
              Update
            </button>
          </div>
          <button className="deleteBtn" onClick={()=>deleteFood(res._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
