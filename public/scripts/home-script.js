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
const ErrMsg = document.querySelector("#errMsg")
const ErrMsgCity = document.querySelector("#errMsgCity")

const weather = {};

weather.temperature = {
    unit: "celsius"
}

const KELVIN = 273;

const key = "fb0d9be033d9deb37814eb9956001d2c"

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    alert("Location not found")
}
function showError() {
    ErrMsg.innerHTML = `<div class="alert alert-warning d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
        <use xlink:href="#exclamation-triangle-fill" />
    </svg>
    <div>
    couldn't find Your location! Please turn on Your location
    </div>
</div>`
}


async function getCity(city) {
    let api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
    await fetch(api)
        .then(async function (response) {
            let data = await response.json();
            console.log("newapi", api)
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
    let api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`;
    await fetch(api)
        .then(async function (response) {
            // console.log("data", api)
            let data = await response.json();
            return data;
        })
        .then(async function (data) {
            // console.log("sad", data)
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

async function getWeather(data) {
    // console.log("city is", data);
    try {
        let api = `https://api.openweathermap.org/data/2.5/forecast?q=${data.city.name}&appid=${key}`;
        await fetch(api)
            .then(async function (response) {
                let data = await response.json();
                return data;
            })
            .then(async function (data) {
                displayWeather(data)
            })
    } catch (e) {
        alert("Please Enter a Valid Location?")
    }
}




function displayWeather(data) {
    // console.log("new",data)
    let secs = data.list[0].dt;
    // console.log(secs);
    const output = new Date(secs * 1000);
    let str = String(output);

    var ds = str;
    var date = (ds.substr(0, 7));
    var date1 = (ds.substr(10, 11));
    var j = date + date1;
    var finalR = j.substr(0, 12);

    let angle = data.list[0].wind.deg
    function getCardinalDirection(angle) {
        const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
        return directions[Math.round(angle / 45) % 8];
    }
    let result = getCardinalDirection(angle);

    let CurrentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

    let sunSet = data.city.sunset;
    let s = new Date(sunSet * 1000);
    theDate = new Date(Date.parse(s));
    let sunsetTime = theDate.toLocaleTimeString();
    // console.log(sunSetTime);




    let temperature = Math.floor(data.list[0].main.temp - KELVIN);
    topLocation.innerHTML = `${data.city.name}, ${data.city.country}`;
    divLocation.innerHTML = `${data.city.name}, ${data.city.country}`;
    divTemperature.innerHTML = `${temperature} <span>&#8451;</span>`;
    weatherDesc.innerHTML = data.list[0].weather[0].description;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">`;
    divHumidity.innerHTML = `${data.list[0].main.humidity} %`;
    divWindSpeed.innerHTML = `${data.list[0].wind.speed} km/h  ` + result;
    divPressure.innerHTML = `${data.list[0].main.pressure} mBar`;
    todayDate.innerHTML = finalR;
    todayTime.innerHTML = CurrentTime;
    sunSetTime.innerHTML = sunsetTime;

}

// getCity("Delhi")
