let now = new Date();
let currentTime = document.querySelector("#current-time");

let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minutes = now.getMinutes();

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
let day = days[now.getDay()];

currentTime.innerHTML = `${day} ${hour}:${minutes}`;

function showForecast() {
  let forecastUnit = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `   <div class="col-2">
            <div class="forecast-day">
              Mon
            </div>
            <span class="forecast-icon">☁</span>
            <div class="forecast-temp"> 
              <span class="forecast-temp-max">19°</span>
              <span class="forecast-temp-min">11°</span>
            </div>
          </div>`;
  forecastHTML =
    forecastHTML +
    `  
          <div class="col-2">
            <div class="forecast-day">
              Mon
            </div>
            <span class="forecast-icon">☁</span>
            <div class="forecast-temp"> 
              <span class="forecast-temp-max">19°</span>
              <span class="forecast-temp-min">11°</span>
            </div>
          </div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastUnit.innerHTML = forecastHTML;
}
function showWeather(response) {
  console.log(response.data);
  let theCity = document.querySelector("#city");
  theCity.innerHTML = response.data.name;
  let theTemperature = document.querySelector("#temperature");
  theTemperature.innerHTML = Math.round(response.data.main.temp);
  let theHumidity = document.querySelector("#humidity");
  theHumidity.innerHTML = response.data.main.humidity;
  let theWind = document.querySelector("#wind");
  theWind.innerHTML = Math.round(response.data.wind.speed);
}
function findCity(city) {
  let apiKey = "681731981e95f8395458df4844e3326c";
  let searchCity = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${cityInput.value}`;
  findCity(city);
}

function searchLocation(position) {
  let apiKey = "681731981e95f8395458df4844e3326c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);

let form = document.querySelector(".search");
form.addEventListener("submit", searchCity);

showForecast();
