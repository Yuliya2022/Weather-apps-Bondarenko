function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }

  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastUnit = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `  
          <div class="col-2">
            <div class="forecast-day">
              ${formatDay(forecastDay.dt)}
            </div>
            <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="35"
        />
            <div class="forecast-temp"> 
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastUnit.innerHTML = forecastHTML;
}
function getForecast(coord) {
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  console.log(response.data);
  let theCity = document.querySelector("#city");
  theCity.innerHTML = response.data.name;
  let theDescription = document.querySelector("#weather-description");
  theDescription.innerHTML = response.data.weather[0].description;
  let theTemperature = document.querySelector("#temperature");
  celsiusTemp = response.data.main.temp;
  theTemperature.innerHTML = Math.round(celsiusTemp);
  let theHumidity = document.querySelector("#humidity");
  theHumidity.innerHTML = response.data.main.humidity;
  let theWind = document.querySelector("#wind");
  theWind.innerHTML = Math.round(response.data.wind.speed);
  let theDate = document.querySelector("#current-time");
  theDate.innerHTML = formatDate(response.data.dt * 1000);
  let theIcon = document.querySelector("#icon");
  theIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
function findCity(city) {
  let apiKey = "681731981e95f8395458df4844e3326c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  findCity(cityInput.value);
}

function searchLocation(response) {
  let apiKey = "681731981e95f8395458df4844e3326c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${getLocation}&lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let theTemperature = document.querySelector("#temperature");
  theTemperature.innerHTML = Math.round(celsiusTemp);
}

function showFahrenheitTemp(event) {
  event.preventDefault();

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let theTemperature = document.querySelector("#temperature");
  theTemperature.innerHTML = Math.round(fahrenheitTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

findCity("Warsaw");
