const topLocation = document.querySelector(".top-location")
const weatherIcon = document.querySelector(".weather-icon")
const weatherDesc = document.querySelector(".weather-desc")
const divLocation = document.querySelector(".location")
const divTemperature = document.querySelector(".temperature")
const divHumidity = document.querySelector(".humidity")
const divWindSpeed = document.querySelector(".wind-speed")
const divPressure = document.querySelector(".pressure")
const searchBtn = document.querySelector("#search-button")
const searchCity = document.querySelector("#search-city")
const sCity = document.querySelector(".s-city")
const divSCity = document.querySelector(".divS-city")



const weather = {};

weather.temperature = {
    unit: "celsius"
}

const KELVIN = 273;

const key = "fb0d9be033d9deb37814eb9956001d2c"
const cnt = "7"

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    alert("Location not found")
}
function showError() {
    alert("couldn't find Location")
}

// function searchLocation(city){
//     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
//     fetch(apiUrl).then(displayWeather);
// }



function searchCity(city) {
    console.log(city);
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    axios.get(api).then(getWeather);
}

searchBtn.addEventListener('click', (event) => {
    let len = searchCity.value
    event.preventDefault()
    searchCity(searchCity.value);

})


function setPosition(position) {
    console.log(position)
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

async function getUserLocation(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cnt=${cnt}&appid=${key}`;
    axios.get(api).then(getWeather)
}

async function getWeather(response) {
    

    await fetch(api)
        .then(async function (response) {
            let data = await response.json();
            console.log("nksdjvn", data)
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.Hum = data.main.humidity;
            weather.press = data.main.pressure;
            weather.wSpeed = data.wind.speed;
        })
        .then(function () {
            displayWeather();
        });
}

function displayWeather() {
    topLocation.innerHTML = ` ${weather.city}, ${weather.country}`;
    divLocation.innerHTML = ` ${weather.city}, ${weather.country}`;
    divTemperature.innerHTML = `${weather.temperature.value} <span>&#8451;</span>`;
    weatherDesc.innerHTML = weather.description;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}@2x.png">`;
    divHumidity.innerHTML = `${weather.Hum} %`;
    divWindSpeed.innerHTML = `${weather.wSpeed} km/h`;
    divPressure.innerHTML = `${weather.press} mBar`;

}
