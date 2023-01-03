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

const topLocation1 = document.querySelector(".top-location-1")


const divTemperature1 = document.querySelector(".temperature-1")
const divHumidity1 = document.querySelector(".humidity-1")
const divWindSpeed1 = document.querySelector(".wind-speed-1")
const divPressure1 = document.querySelector(".pressure-1")
const todayDate1 = document.querySelector(".current-day-1")
const weatherIcon1 = document.querySelector(".weather-icon-1")
const weatherDesc1 = document.querySelector(".weather-desc-1")

const divTemperature2 = document.querySelector(".temperature-2")
const divHumidity2 = document.querySelector(".humidity-2")
const divWindSpeed2 = document.querySelector(".wind-speed-2")
const divPressure2 = document.querySelector(".pressure-2")
const todayDate2 = document.querySelector(".current-day-2")
const weatherIcon2 = document.querySelector(".weather-icon-2")
const weatherDesc2 = document.querySelector(".weather-desc-2")

const divTemperature3 = document.querySelector(".temperature-3")
const divHumidity3 = document.querySelector(".humidity-3")
const divWindSpeed3 = document.querySelector(".wind-speed-3")
const divPressure3 = document.querySelector(".pressure-3")
const todayDate3 = document.querySelector(".current-day-3")
const weatherIcon3 = document.querySelector(".weather-icon-3")
const weatherDesc3 = document.querySelector(".weather-desc-3")

const divTemperature4 = document.querySelector(".temperature-4")
const divHumidity4 = document.querySelector(".humidity-4")
const divWindSpeed4 = document.querySelector(".wind-speed-4")
const divPressure4 = document.querySelector(".pressure-4")
const todayDate4 = document.querySelector(".current-day-4")
const weatherIcon4 = document.querySelector(".weather-icon-4")
const weatherDesc4 = document.querySelector(".weather-desc-4")

const divTemperature5 = document.querySelector(".temperature-5")
const divHumidity5 = document.querySelector(".humidity-5")
const divWindSpeed5 = document.querySelector(".wind-speed-5")
const divPressure5 = document.querySelector(".pressure-5")
const todayDate5 = document.querySelector(".current-day-5")
const weatherIcon5 = document.querySelector(".weather-icon-5")
const weatherDesc5 = document.querySelector(".weather-desc-5")

const divTemperature6 = document.querySelector(".temperature-6")
const divHumidity6 = document.querySelector(".humidity-6")
const divWindSpeed6 = document.querySelector(".wind-speed-6")
const divPressure6 = document.querySelector(".pressure-6")
const todayDate6 = document.querySelector(".current-day-6")
const weatherIcon6 = document.querySelector(".weather-icon-6")
const weatherDesc6 = document.querySelector(".weather-desc-6")



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
    let api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
    await fetch(api)
        .then(async function (response) {
            let data = await response.json();
            console.log("newapi",api)
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
    // console.log(position)
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
    let api = `https://api.openweathermap.org/data/2.5/forecast?q=${data.city.name}&appid=${key}`;
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
    console.log("new",data)
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
    console.log(sunSetTime);




    let temperature0 = Math.floor(data.list[0].main.temp - KELVIN);
    topLocation.innerHTML = `${data.city.name}, ${data.city.country}`;
    divLocation.innerHTML = `${data.city.name}, ${data.city.country}`;
    divTemperature.innerHTML = `${temperature0} <span>&#8451;</span>`;
    weatherDesc.innerHTML = data.list[0].weather[0].description;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">`;
    divHumidity.innerHTML = `${data.list[0].main.humidity} %`;
    divWindSpeed.innerHTML = `${data.list[0].wind.speed} km/h  ` + result;
    divPressure.innerHTML = `${data.list[0].main.pressure} mBar`;
    todayDate.innerHTML = finalR;
    todayTime.innerHTML = CurrentTime;
    sunSetTime.innerHTML = sunsetTime;


    topLocation1.innerHTML = `${data.city.name}, ${data.city.country}`;

    let temperature1 = Math.floor(data.list[2].main.temp - KELVIN);
    divTemperature1.innerHTML = `${temperature1} <span>&#8451;</span>`;
    weatherDesc1.innerHTML = data.list[2].weather[1].description;
    weatherIcon1.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png">`;
    divHumidity1.innerHTML = `${data.list[2].main.humidity} %`;
    divWindSpeed1.innerHTML = `${data.list[2].wind.speed} km/h  ` + result;
    divPressure1.innerHTML = `${data.list[2].main.pressure} mBar`;
    todayDate1.innerHTML = finalR;
    // topLocation1.innerHTML = `${data.city.name}, ${data.city.country}`;

    console.log("111",divTemperature1);



    let temperature2 = Math.floor(data.list[2].main.temp - KELVIN);
    divTemperature2.innerHTML = `${temperature2} <span>&#8451;</span>`;
    weatherDesc2.innerHTML = data.list[2].weather[0].description;
    weatherIcon2.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png">`;
    divHumidity2.innerHTML = `${data.list[2].main.humidity} %`;
    divWindSpeed2.innerHTML = `${data.list[2].wind.speed} km/h  ` + result;
    divPressure2.innerHTML = `${data.list[2].main.pressure} mBar`;
    todayDate2.innerHTML = finalR;

    let temperature3 = Math.floor(data.list[10].main.temp - KELVIN);
    divTemperature3.innerHTML = `${temperature3} <span>&#8451;</span>`;
    weatherDesc3.innerHTML = data.list[10].weather[0].description;
    weatherIcon3.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[10].weather[0].icon}@2x.png">`;
    divHumidity3.innerHTML = `${data.list[10].main.humidity} %`;
    divWindSpeed3.innerHTML = `${data.list[10].wind.speed} km/h  ` + result;
    divPressure3.innerHTML = `${data.list[10].main.pressure} mBar`
    todayDate3.innerHTML = finalR;

    let temperature4 = Math.floor(data.list[18].main.temp - KELVIN);
    divTemperature4.innerHTML = `${temperature4} <span>&#8451;</span>`;
    weatherDesc4.innerHTML = data.list[18].weather[0].description;
    weatherIcon4.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[18].weather[0].icon}@2x.png">`;
    divHumidity4.innerHTML = `${data.list[18].main.humidity} %`;
    divWindSpeed4.innerHTML = `${data.list[18].wind.speed} km/h  ` + result;
    divPressure4.innerHTML = `${data.list[18].main.pressure} mBar`;
    todayDate4.innerHTML = finalR;

    let temperature5 = Math.floor(data.list[26].main.temp - KELVIN);
    divTemperature5.innerHTML = `${temperature5} <span>&#8451;</span>`;
    weatherDesc5.innerHTML = data.list[26].weather[0].description;
    weatherIcon5.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[26].weather[0].icon}@2x.png">`;
    divHumidity5.innerHTML = `${data.list[26].main.humidity} %`;
    divWindSpeed5.innerHTML = `${data.list[26].wind.speed} km/h  ` + result;
    divPressure5.innerHTML = `${data.list[26].main.pressure} mBar`;
    todayDate5.innerHTML = finalR;

    let temperature6 = Math.floor(data.list[34].main.temp - KELVIN);
    divTemperature6.innerHTML = `${temperature6} <span>&#8451;</span>`;
    weatherDesc6.innerHTML = data.list[34].weather[0].description;
    weatherIcon6.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[34].weather[0].icon}@2x.png">`;
    divHumidity6.innerHTML = `${data.list[34].main.humidity} %`;
    divWindSpeed6.innerHTML = `${data.list[34].wind.speed} km/h  ` + result;
    divPressure6.innerHTML = `${data.list[34].main.pressure} mBar`;
    todayDate6.innerHTML = finalR;

}
