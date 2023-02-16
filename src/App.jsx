import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import {} from 'react-icons/fa';

function App() {
  const [data, setData] = useState({})
  const [lat, setLat] = useState([])
  const [long, setLong] = useState([])
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=f71c26f8e39ecc81961a43ce3d7125e6`

  const getLocation = () =>{
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log("Latitude is:", lat)
      console.log("Longitude is:", long)
      setLocation(lat,long);    
      getWeather();
    })
  }
  const getWeather = () =>{
    axios.get(url).then((response) =>
    setData(response.data),
    console.log(data)
    )}

  useEffect(() =>{
    getLocation();
  }, []);

  return (
    <div className="py-2 px-4 w-full h-full bg-[url('./images/pic.avif')] bg-cover bg-no-repeat">
     <section className="grid place-items-center gap-2">
      {
        location >0 && (
          <div className="bg-[rgba(255,255,255,0.15)] w-full my-2">
            <h2 className="grid place-items-center text-2xl font-semibold">Location Cordinates</h2>
          <h2 className="grid place-items-center font-medium">Latitude:{lat}</h2>
          <h2 className="grid place-items-center font-medium">Longitude:{long}</h2>
          <div className="grid place-items-center font-semibold text-xl">Location: {data.name}</div>
          {data.sys ? <div className="grid place-items-center font-medium">{data.sys.country}</div> : null}
      </div>
        )
      }
      <button onClick={getLocation} className="rounded-md ml-2 bg-slate-600 py-2 px-3 hover:font-semibold">Find Me!</button>
      <button onClick={getLocation} className="rounded-md ml-2 bg-slate-600 py-2 px-3 hover:font-semibold">Weather Now</button>
     </section>
     {
      data.name !== undefined && (
        <div>
        <section className="my-2 grid place-items-center max-w-3xl mx-auto">
        <div className="rounded-md py-8 px-8 flex flex-col bg-[rgba(255,255,255,0.15)]">
          {data.main ? <h2 className="text-6xl font-semibold">{data.main.temp.toFixed()}&deg;C</h2> : null }
          {data.weather ? <p className="grid place-items-center my-3 font-medium text-lg">{data.weather[0].main}</p> : null}
          {data.weather ? <p className="grid place-items-center my-3 font-medium text-lg">{data.weather[0].description}</p> : null}
        </div>
       </section>
        <section className="mt-3 w-full h-[300px] grid place-items-center max-w-3xl mx-auto">
        <div className="flex gap-2 rounded-md px-4 py-2 bg-[rgba(255,255,255,0.15)]">
        {data.main ?<div className="font-medium flex flex-col gap-2"><span>Humidity</span><span className="font-semibold grid place-items-center">{data.main.humidity}%</span></div>: null }
        {data.main ?<div className="font-medium flex flex-col gap-2"><span>Feels Like</span><span className="font-semibold grid place-items-center">{data.main.feels_like.toFixed()} &deg;</span></div>: null }
        {data.wind ?<div className="font-medium flex flex-col gap-2"><span>Wind Speed</span><span className="font-semibold grid place-items-center">{data.wind.speed.toFixed()} Km/hr</span></div>: null }
        </div>
       </section>
     </div>
      )
     }
    </div>
  )
}

export default App
