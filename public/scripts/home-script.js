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
const todayDate = document.querySelector(".current-date")
const todayTime = document.querySelector(".current-time")
const sunSetTime = document.querySelector(".sun-set")



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


async function getCity(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    await fetch(api)
        .then(async function (response) {
            let data = await response.json();
            return data;
        })
        .then(async function (data) {
            getWeather(data)
        })
}

searchBtn.addEventListener('click', (event) => {
    let len = searchCity.value
    event.preventDefault()
    getCity(searchCity.value);

})


function setPosition(position) {
    console.log(position)
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getUserLocation(latitude, longitude);
}

async function getUserLocation(latitude, longitude) {
    console.log(latitude, longitude);
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cnt=${cnt}&appid=${key}`;
    await fetch(api)
        .then(async function (response) {
            console.log("data", api)
            let data = await response.json();
            return data;
        })
        .then(async function (data) {
            console.log("sad", data)
            getWeather(data)
        })
}

// async function getWeather(data) {

//     weather.temperature.value = Math.floor(data.main.temp - KELVIN);
//     weather.description = data.weather[0].description;
//     weather.iconId = data.weather[0].icon;
//     weather.city = data.name;
//     weather.country = data.sys.country;
//     weather.Hum = data.main.humidity;
//     weather.press = data.main.pressure;
//     weather.wSpeed = data.wind.speed;

//     getWeather(weather);
// }

async function getWeather(city) {
    console.log("city is", city);
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${key}`;
    await fetch(api)
        .then(async function (response) {
            let data = await response.json();
            return data;
        })
        .then(async function (data) {
            displayWeather(data)
        })
}




function displayWeather(data) {
    let secs = data.dt;
    console.log(secs);
    const output = new Date(secs * 1000);

    let str = String(output);

    var ds = str;
    var date = (ds.substr(0, 7));
    var date1 = (ds.substr(10, 11));
    var j = date + date1;
    var finalR = j.substr(0, 12);

    let angle = data.wind.deg
    function getCardinalDirection(angle) {
        const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
        return directions[Math.round(angle / 45) % 8];
    }
    let result = getCardinalDirection(angle);

    let CurrentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

    let sunSet = data.sys.sunset;
    let s = new Date(sunSet * 1000);
    theDate = new Date(Date.parse(s));
    let sunsetTime = theDate.toLocaleTimeString();
    // console.log(t);




    let temperature = Math.floor(data.main.temp - KELVIN);
    topLocation.innerHTML = ` ${data.name}, ${data.sys.country}`;
    divLocation.innerHTML = `  ${data.name}, ${data.sys.country}`;
    divTemperature.innerHTML = `${temperature} <span>&#8451;</span>`;
    weatherDesc.innerHTML = data.weather[0].description;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    divHumidity.innerHTML = `${data.main.humidity} %`;
    divWindSpeed.innerHTML = `${data.wind.speed} km/h  ` + result;
    divPressure.innerHTML = `${data.main.pressure} mBar`;
    todayDate.innerHTML = finalR;
    todayTime.innerHTML = CurrentTime;
    sunSetTime.innerHTML = sunsetTime;

}
