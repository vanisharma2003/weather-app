import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './style.css'
const Card = () => {
   const [city,setCity] = useState("")
   const [weatherdata,setweatherdata]=useState(null)
   const [error,seterrror]=useState(null)
   const handlechange=(event)=>{
      setCity(event.target.value)
   }
   const handlesubmit=(event)=>{
    event.preventDefault()
    seterrror(null)
    const API_Key="79de1c87287090aad73a4243acc73f61"
   const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`
   fetch(URL)
   .then((response)=>{
    if(!response.ok){
      throw new Error("city not found or invalid API")
    }
    return response.json()
   })
   .then((data)=>{
     setweatherdata({main:data.main,weather:data.weather[0]})
   })
   .catch((error)=>{
    seterrror(error.message)
    setweatherdata(null)
   })
   
   setCity("")
   }
   
  return (
    <>
    {/* onsubmit event form m triggered hoga */}
    <form onSubmit={handlesubmit}>
    <TextField id="outlined-basic" label="Outlined" variant="outlined" required value={city} onChange={handlechange}/>
    <div className='weather-data'>
    {weatherdata&&(<>
   <p>temp : {weatherdata.main.temp}</p>
   <p>temp_max :{weatherdata.main.temp_max}</p>
   <p>temp_min :{weatherdata.main.temp_min}</p>
   <p>feels_like:{weatherdata.main.feels_like}</p>
   <p>description:{weatherdata.weather.description}</p>
   </>)}
   {error && (<p>Error : {error}</p>)}
    </div>
 
    <Button type="submit">Primary</Button>
    </form>
      
    </>
  )
}

export default Card
