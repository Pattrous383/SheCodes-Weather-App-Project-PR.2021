let showTime = document.querySelector("#current-time");
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0 ${minutes}`;
}

showTime.innerHTML = `${day}, ${currentTime.getHours()}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let apiKey = "ee90f81b3f717e64b2208762cc3f3fae";
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#current-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  city.innerHTML = `${searchInput.value}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

let searchAction = document.querySelector("#search-form");
searchAction.addEventListener("submit", showCity);

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let showCurrentCityTemp = document.querySelector("#current-location-input");
  let currentCity = response.data.name;
  showCurrentCityTemp.innerHTML = `It is ${temperature}°C in ${currentCity}`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ee90f81b3f717e64b2208762cc3f3fae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchWeatherLocation = document.querySelector("#current-location");
searchWeatherLocation.addEventListener("click", getLocation);
