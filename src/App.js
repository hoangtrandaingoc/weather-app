import React, { useState, useEffect} from 'react';
import './App.scss';
import Weather from './components/Weather';
import axios from 'axios';

import Sunny from './Icon/sunny.gif';
import Drizzle from './Icon/drizzle.gif';
import Fog from './Icon/fog.gif';
import Rain from './Icon/rain.gif';
import Snow from './Icon/snow.gif';
import Thunderstorm from './Icon/thunderstorm.gif';
import Cloud from './Icon/cloud.gif';
import SearchCity from './components/SearchCity';


function App() {
  const [weather, setWeather] = useState({
    city: undefined,
    country: undefined,
    main: undefined,
    celsius: undefined,
    temp_max: undefined,
    temp_min: undefined,
    description: "",
    sunrise: undefined,
    sunset: undefined,
    error: false,
    
  })
  const [weatherIcon, setWeatherIcon] = useState(undefined)


  //   Thunderstorm: "wi-thunderstorm",
  //   Drizzle: "wi-sleet",
  //   Rain: "wi-storm-showers",
  //   Snow: "wi-snow",
  //   Atmosphere: "wi-fog",
  //   Clear: "wi-day-sunny",
  //   Clouds: "we-day-fog"

  
  function getWeatherIcon(rangedId){
    switch(true){
      case rangedId >= 200 && rangedId <= 232:
        setWeatherIcon(Thunderstorm);
        break;
      case rangedId >= 300 && rangedId <= 321:
        setWeatherIcon(Drizzle);
        break;
      case rangedId >= 500 && rangedId <= 531:
        setWeatherIcon(Rain);
        break;
      case rangedId >= 600 && rangedId <= 622:
        setWeatherIcon(Snow);
        break;
      case rangedId >= 701 && rangedId <= 781:
        setWeatherIcon(Fog);
        break;
      case rangedId === 800:
        setWeatherIcon(Sunny);
        break;
      case rangedId >= 801 && rangedId <= 804:
        setWeatherIcon(Cloud);
        break;
    }
  }

  // const [city, setCity] = useState('Ho Chi Minh City');
  // const [country, setCountry] = useState ('VN');
  const [filters, setfilters] = useState({
    city: 'Ho Chi Minh City',
    country: 'VN'
  })

  console.log("filters first:", filters);
  const apiKey = "5187a02a880134c8ffc05e49bfa3cfdf"
  let url = "http://api.openweathermap.org/data/2.5/weather?q=" + filters.city + ',' + filters.country + "&appid=" + apiKey;

  useEffect(() => {
      axios.get(url)
        .then((response) => {
          const res = response.data;
          setWeather({
            city: res.name,
            country: res.sys.country,
            celsius: calCelsius(res.main.temp),
            temp_max: calCelsius(res.main.temp_max),
            temp_min: calCelsius(res.main.temp_min),
            description: res.weather[0].description,
            icon: getWeatherIcon(res.weather[0].id),
            sunrise: convertUnixTime(res.sys.sunrise),
            sunset: convertUnixTime(res.sys.sunset)
          })
        })
  }, [filters.city]);

  function calCelsius(temp){
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  function convertUnixTime(unix_timestamp){
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }

  function handleFormSubmit(formValues){
    const newWeather = {
      ...formValues,
    }
    setfilters(newWeather);
    console.log("set weather:",newWeather);
  }

  return (
    <div className="App">
      <SearchCity onSubmit={handleFormSubmit}/>
      <Weather 
        city={weather.city} 
        country={weather.country}
        temp_celsius={weather.celsius}
        temp_max={weather.temp_max}
        temp_min={weather.temp_min}
        description={weather.description}
        weatherIcon={weatherIcon}
        sunrise={weather.sunrise}
        sunset={weather.sunset}
      />
    </div>
  );
}

export default App;
