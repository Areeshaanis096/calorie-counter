"use client"
import { useState } from "react";
export default function Home() {
  // states
  const [check,setCheck]= useState({
    "breakfast": [],
    "lunch":[],
    "dinner":[],
    "snacks":[],
    "exercise":[]
  })
  const[color,setColor] = useState(false)
  const[finals,setFinals] = useState(false)
  const [budget,setBudget] = useState()
  const[select,setSelect] = useState("breakfast");
  const [remainingCalories,setRemainigCalories]= useState('')
  const[consumedCalories,setConsumedCalories] = useState("")
  const[burned,setBurned] =useState("")

  // variables
  let remainings;
  let showings;
  let exercised;
  let consumed;

// functions onclick
const clickAddEntry =  ()=>{
  setCheck(prev => {
    return{
      ...prev,
      [select]:[
        ...prev[select],
        0
      ]
    }
  })
}

const clickCalculate =(e) =>{
  e.preventDefault()
  
  let added = Object.values(check).map((i)=> i.reduce((a,b)=> a + b, 0 ))
  // console.log(added)
  consumed = added.slice(0,4).reduce((a,b)=> a + b, 0 )
  console.log(consumed)
  // consumed =  consumed.reduce((a,b)=> a+b,0)
  exercised = added.pop();
  remainings = (budget - consumed) + exercised
  showings = remainings < 0 ? "surplus" : "deficit"
  setColor(showings === "deficit" ? true : false)
  setFinals(true)
  setRemainigCalories(`${Math.abs(remainings)} calories ${showings}`)
  setConsumedCalories(`${consumed} calories consumed`) 
  setBurned(`${exercised} calories burned`)
}

const clickClear = () =>{
  setCheck({
    "breakfast": [],
    "lunch":[],
    "dinner":[],
    "snacks":[],
    "exercise":[]
  })
  setBudget(0)
  setFinals(false)
  setSelect("breakfast")
}

// returning function
const show =()=>{
  return(
    Object.entries(check).map(([key,value])=>{
      return(
      <>
      <fieldset className="border mb-2">
        <legend className="m-2">{key}</legend>
      <div>
        {value.map((i,index)=>{
          return (
            <>
              <label
                for={select + index + "name"} className="m-2">
                Entry {index + 1} name:
              </label>
              <br/>  
              <input
              type="text" 
              id={select + index+ "name"} 
              placeholder="name"
              className="m-2 text-dark-blue"
              />
              <br/>
              <label
                for={select + index + "name"} className="m-2">
                Entry {index + 1} calories 
              </label>
              <br/>
              <input
              type="number" 
              id={select + index + "name"} 
              placeholder="calories"
              className="m-2 text-dark-blue"
              onChange={(e)=>value[index] = Number(e.target.value)}
              />
              <br/>
            </>

          )

      })}
      </div>
      </fieldset>
      </>
      )
    })
  
    
    )
}
  return (
    <main>
      <h1 className="text-center font-medium text-3xl m-4">Calorie Counter</h1>
      <div className=" w-11/12 max-w-2xl my-5 mx-auto ">
        <form id="calorie-counter">
          <label for="budget">Budget</label>
          <input
          id="budget"
          min={0}
          value = {budget}
          placeholder="Daily calorie budget"
          type="number"
          required
          onChange={(e)=>setBudget(e.target.value)}
          className="m-1 text-xs text-dark-blue"
          />
          
            <div>{show()}</div>
            
          <span>
              <label for="entry-dropdown" className="mb-2 text-base">Add food or exercise:</label>
              
              <select 
              id="entry-dropdown" 
              name="options" 
              value={select} 
              onChange={e =>setSelect(e.target.value)} 
              className=" min-h-6 text-dark-blue text-xs m-2">
                <option value="breakfast" selected>Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
                <option value="exercise">Exercise</option>
              </select>
              <button type="button" id="add-entry" className="text-xs p-px bg-light-yellow border-2 border-dark-yellow text-dark-blue" onClick={clickAddEntry} >Add Entry</button>
              <div>
              <button type="submit"  className="text-xs p-px bg-light-yellow border-2 border-dark-yellow text-dark-blue m-1"  onClick={(e)=>clickCalculate(e)}>Calculate remaining calories</button>
              <button type="button" id="clear" className="text-xs p-px bg-light-yellow border-2 border-dark-yellow text-dark-blue m-1 " onClick={clickClear} >clear</button>
              </div>
            </span>
        </form>
        <div className={`${finals ? "block" : "hidden" } border-4 m-2`}>
          <div className="text-center">
            <p className={`${color ? "text-green" : "text-red"} m-2 text-2xl`}>{remainingCalories}</p>
            <hr/>
            <p className="m-2 text-xl">{budget} calories budgeted</p>
            <p className="m-2 text-xl">{consumedCalories}</p>
            <p className="m-2 text-xl">{burned}</p>
          </div>
        </div>
      </div>
    </main>
      );
}
