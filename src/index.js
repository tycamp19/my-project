function formatDate(date) {
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
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
    "November",
    "December"];
let month = months[date.getMonth()];
let calendarDate = date.getDate();
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}



let weekday = document.querySelector("#day");
let currentMonth = document.querySelector("#month");
let currentCalendarDate = document.querySelector("#calendarDate");
let currentTime = document.querySelector("#time");
weekday.innerHTML = `${day}`;
currentMonth.innerHTML = `${month}`;
currentCalendarDate.innerHTML = `${calendarDate}`;
currentTime.innerHTML = `${hours}:${minutes}`;


return `${day} ${month} ${calendarDate} ${hours}:${minutes}`;

}

function displayWeather(response) {
    celsiusTemperature = response.data.main.temp;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
    document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#windSpeed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
    document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

    
}

function formatHours (timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
            let forecast = response.data.list[index];
        forecastElement.innerHTML += `
    <div class="card text-center">
            
            
                <p class="card-text"> ${formatHours(forecast.dt * 1000)} </p>
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
                <div class="card-body">
                <h5 class="card-title">${Math.round(forecast.main.temp_max)} / ${Math.round(forecast.main.temp_min)}º</h5>
                
            </div>
        </div>
    `;
    }
    
}

function search(city) {
    let apiKey = "16204bc981b1d7e0a8129943fa70ea30";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-city").value;
    search(city);
}
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = ((celsiusTemperature * 9) / 5 + 32);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let celsiusTemperature = null;

 let dateElement = document.querySelector("#dateTime");
 let currentDateTime = new Date();
 dateElement.innerHTML = formatDate(currentDateTime);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


search("New York");