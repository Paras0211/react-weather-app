import React, { useState } from "react";
import "./index.css";
const api = {
  url: "https://api.openweathermap.org/data/2.5/",
  key: "4c313c0769c701b171ecdecc0ffce7c7",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const displayDate = (newDate) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Novermber",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[newDate.getDay()];
    let date = newDate.getDate();
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search your city..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {weather && (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{displayDate(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{weather.main.temp}&deg;C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
