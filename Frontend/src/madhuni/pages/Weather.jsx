import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Lottie from "lottie-react";

import rainyBg from "../../assets/rainy.png";
import sunnyBg from "../../assets/rainy.png";
import cloudyBg from "../../assets/cloudy.jpg";
import defaultBg from "../../assets/rainy.png";
import windAnimation from "../../assets/animation/wind.json";
import leaveanimation from "../../assets/animation/Coala02.json";
import windleaveanimation from "../../assets/animation/windleave.json";


const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState([]);

  const translateWeatherToSinhala = (weather) => {
    switch (weather.toLowerCase()) {
      case 'sunny': return 'හොඳින් හිරු එළිය සහිතයි';
      case 'rainy': return 'වර්ෂාව සහිතයි';
      case 'cloudy': return 'වැලකුළු සහිතයි';
      default: return weather;
    }
  };

  const handleSubmit = async () => {
    try {
      // Step 1: Convert Sinhala city to English
      const res1 = await fetch('http://localhost:8000/weather/sinhala-to-english', {
        method: 'POST',
        body: JSON.stringify({ text: city }),
        headers: { 'Content-Type': 'application/json' }
      });
      const res1Data = await res1.json();
      let englishCity = res1Data.english?.trim();
      console.log("🌍 English city is:", englishCity);

      // Step 2: Get lat/lon
      const res2 = await fetch(`http://localhost:8000/location/get-coordinates?city=${englishCity}`);
      const data2 = await res2.json();
      console.log("🧪 Coordinate API response:", data2);
      const latitude = data2.data.lat;
      const longitude = data2.data.lon;

      // Step 3: Get weather forecast
      const res3 = await fetch(`http://localhost:8000/weatherfor16days/forecast?lat=${latitude}&lon=${longitude}`);
      const data = await res3.json();

      setForecast(data.forecast);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  const getImage = (weather) => {
    switch (weather.toLowerCase()) {
      case 'sunny': return sunny;
      case 'cloudy': return cloudy;
      case 'rainy': return rainy;
      default: return 'bg-white';
    }
  };

  const getBackgroundImage = (weather) => {
    switch (weather.toLowerCase()) {
      case 'sunny': return sunnyBg;
      case 'cloudy': return cloudyBg;
      case 'rainy': return rainyBg;
      default: return defaultBg;
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-green-200 via-white to-yellow-50">
        <Navbar />

        <div className="p-6 w-full">
          <div className="mt-16 mb-12 flex justify-center">
            <input
              type="text"
              value={city}
              placeholder="නගරය ඇතුල් කරන්න"
              onChange={(e) => setCity(e.target.value)}
              className="w-[300px] p-3 border border-gray-300 rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-800 text-white rounded-r-lg hover:bg-green-700"
            >
              සෙවීම
            </button>
          </div>

          {forecast.length === 0 && (
            <div className="flex justify-center items-center">
              <Lottie
                animationData={leaveanimation}
                loop
                className="w-[2000px] h-[400px]"
              />
            </div>
          )}

          <div
            className="flex overflow-x-auto space-x-6 pb-6 px-4 w-full scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {forecast.map((day, idx) => (
              <div
                key={idx}
                className="min-w-[200px] w-[250px] h-[320px] flex flex-col items-center justify-between p-6 text-white rounded-2xl shadow-lg overflow-hidden relative"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${getBackgroundImage(day.weather)})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-between">
                  <p className="font-medium">{translateWeatherToSinhala(day.weather)}</p>
                  <div className="w-20 h-20 mb-2">
                    <img
                      src={`/images/${day.weather.toLowerCase()}.png`}
                      alt={day.weather}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="text-center">
                    <p className="font-bold text-lg">{day.date}</p>
                  </div>

                  <div className="text-sm mt-2 text-center">
                    <p>🌞 ඉහළම උෂ්ණත්වය: {day.max_temp}°C</p>
                    <p>❄️ අඩුම උෂ්ණත්වය: {day.min_temp}°C</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;