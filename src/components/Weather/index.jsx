import React from 'react';
import './Weather.scss';
import Hot from '../../Icon/hot.svg';
import Sunrise from '../../Icon/sun.svg';
import Sunset from '../../Icon/moon.svg';


function Weather(prop) {
    const {city, country, temp_celsius, temp_min, temp_max, description, weatherIcon, sunrise, sunset} = prop;
    return (
        <div className="container weather">
            <div className="cards pt-4">
                <h1>{city}, {country}</h1>
                <div className="py-2">
                    <img className="icon-weather" src={weatherIcon} alt="error"/>
                </div>
                <img className="elsius" src={Hot} alt="error"/>
                <h1 className="py-2">{temp_celsius}&deg;</h1>
            </div>
            {
                minmaxTemp(temp_min,temp_max)
            }
            <span className="px-4"><img className="sunrise" src={Sunrise} alt="error"/> {sunrise}</span>
            <span className="px-4"><img className="sunset" src={Sunset} alt="error"/> {sunset}</span>

            <h4 className="py-3">{description}</h4>
        </div>
    );
    

    function minmaxTemp(min,max){
        return(
            <h3>
                <span className="px-4"><i class="wi wi-direction-down"></i> {min}&deg;</span>
                <span className="px-4"><i class="wi wi-direction-up"></i> {max}&deg;</span>
            </h3>
        );
    }
}

export default Weather;