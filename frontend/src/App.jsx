import { useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const[city,setCity] = useState('');
  const[weather,setWeather] = useState(null);

  async function sendRequest(){
    try{
       const response = await axios.get(`http://localhost:3000/api/weather?city=${city}`);
       setWeather(response.data);
    }
    catch(error){
      console.error("İstek atılamadı.",error)
    }
  }

  


  return (
    <div>
    <input type="text" onChange={(e)=>setCity(e.target.value)} value={city}/>
    <button onClick={sendRequest}>Şehir sorgula</button>
    {weather && (
  <>
    <li>{`${weather.name}: ${Math.floor(weather.main.temp)}°C - ${weather.weather[0].description}`}</li>
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
  </>
)}
    </div>
  )
}

export default App
