import React, { useState } from 'react'
import './style.css'
const Cardnew = () => {
    // API fecthing and all using async and await //
    const [city,setCity]=useState("")
    const [weatherdata,setweatherData]=useState(null)
    const [error,seterror]=useState(null)
    async function getWeather(){
      const API_Key="79de1c87287090aad73a4243acc73f61"
      const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`
      try{
        if(!city){
          seterror("Please enter a city name")
          return
        }
        const response = await fetch(URL)
        if(!response.ok){
          throw new Error("city name is not valid OR API does not exist")
        }
        
        const data = await response.json()
        setweatherData(data)
      }
      catch(error){
        seterror(error.message)
        setweatherData(null)
      }
      setCity("")
      }
      
   
    const handleOnChange=(event)=>{
     setCity(event.target.value)
    }
  return (
    <>
    <div className="weather-data">
    <h1>Today's Weather</h1>
    <input placeholder="enter your city" value={city} onChange={handleOnChange} id="input"/>
      {weatherdata && (<>
      <p>temp : {weatherdata.main.temp}</p>
      <p>temp_max : {weatherdata.main.temp_max}</p>
      <p>temp_min : {weatherdata.main.temp_min}</p>
      <p>feels_like : {weatherdata.main.feels_like}</p>
      <p>weather: {weatherdata.weather[0].description}</p>
      </>)}
      {error && (<p>Error : {error}</p>)}
      <button onClick={getWeather} id="btn">Click Me</button>
    </div>
      
    </>
  )
}

export default Cardnew
