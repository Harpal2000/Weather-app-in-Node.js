

const searchBtn = document.querySelector("#search-button")
const searchCity = document.querySelector("#search-city")

const topLocation1 = document.querySelector(".top-location-1")


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
    console.log("new", data)
    let secs2 = data.list[2].dt;
    let secs3 = data.list[10].dt;
    let secs4 = data.list[18].dt;
    let secs5 = data.list[26].dt;
    let secs6 = data.list[34].dt;
    // console.log(secs);
    const output2 = new Date(secs2 * 1000);
    const output3 = new Date(secs3 * 1000);
    const output4 = new Date(secs4 * 1000);
    const output5 = new Date(secs5 * 1000);
    const output6 = new Date(secs6 * 1000);

    let str2 = String(output2);
    let str3 = String(output3);
    let str4 = String(output4);
    let str5 = String(output5);
    let str6 = String(output6);

    var ds2 = str2;
    var ds3 = str3;
    var ds4 = str4;
    var ds5 = str5;
    var ds6 = str6;

    var date2 = (ds2.substr(0, 7));
    var date3 = (ds3.substr(0, 7));
    var date4 = (ds4.substr(0, 7));
    var date5 = (ds5.substr(0, 7));
    var date6 = (ds6.substr(0, 7));

    var date12 = (ds2.substr(10, 11));
    var date13 = (ds3.substr(10, 11));
    var date14 = (ds4.substr(10, 11));
    var date15 = (ds5.substr(10, 11));
    var date16 = (ds6.substr(10, 11));

    var j2 = date2 + date12;
    var j3 = date3 + date13;
    var j4 = date4 + date14;
    var j5 = date5 + date15;
    var j6 = date6 + date16;

    var finalR2 = j2.substr(0, 12);
    var finalR3 = j3.substr(0, 12);
    var finalR4 = j4.substr(0, 12);
    var finalR5 = j5.substr(0, 12);
    var finalR6 = j6.substr(0, 12);

    console.log(finalR2)
    console.log(finalR3)
    console.log(finalR4)
    console.log(finalR5)
    console.log(finalR6)

    // let angle = data.list[0].wind.deg
    // function getCardinalDirection(angle) {
    //     const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    //     return directions[Math.round(angle / 45) % 8];
    // }
    // let result = getCardinalDirection(angle);

    // let CurrentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

    // let sunSet = data.city.sunset;
    // let s = new Date(sunSet * 1000);
    // theDate = new Date(Date.parse(s));
    // let sunsetTime = theDate.toLocaleTimeString();
    // console.log(sunSetTime);




    topLocation1.innerHTML = `${data.city.name}, ${data.city.country}`;

    let temperature2 = Math.floor(data.list[2].main.temp - KELVIN);
    divTemperature2.innerHTML = `${temperature2} <span>&#8451;</span>`;
    weatherDesc2.innerHTML = data.list[2].weather[0].description;
    weatherIcon2.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png">`;
    divHumidity2.innerHTML = `${data.list[2].main.humidity} %`;
    divWindSpeed2.innerHTML = `${data.list[2].wind.speed} km/h  `;
    divPressure2.innerHTML = `${data.list[2].main.pressure} mBar`;
    todayDate2.innerHTML = finalR2;

    let temperature3 = Math.floor(data.list[10].main.temp - KELVIN);
    divTemperature3.innerHTML = `${temperature3} <span>&#8451;</span>`;
    weatherDesc3.innerHTML = data.list[10].weather[0].description;
    weatherIcon3.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[10].weather[0].icon}@2x.png">`;
    divHumidity3.innerHTML = `${data.list[10].main.humidity} %`;
    divWindSpeed3.innerHTML = `${data.list[10].wind.speed} km/h  `;
    divPressure3.innerHTML = `${data.list[10].main.pressure} mBar`
    todayDate3.innerHTML = finalR3;

    let temperature4 = Math.floor(data.list[18].main.temp - KELVIN);
    divTemperature4.innerHTML = `${temperature4} <span>&#8451;</span>`;
    weatherDesc4.innerHTML = data.list[18].weather[0].description;
    weatherIcon4.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[18].weather[0].icon}@2x.png">`;
    divHumidity4.innerHTML = `${data.list[18].main.humidity} %`;
    divWindSpeed4.innerHTML = `${data.list[18].wind.speed} km/h  `;
    divPressure4.innerHTML = `${data.list[18].main.pressure} mBar`;
    todayDate4.innerHTML = finalR4;

    let temperature5 = Math.floor(data.list[26].main.temp - KELVIN);
    divTemperature5.innerHTML = `${temperature5} <span>&#8451;</span>`;
    weatherDesc5.innerHTML = data.list[26].weather[0].description;
    weatherIcon5.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[26].weather[0].icon}@2x.png">`;
    divHumidity5.innerHTML = `${data.list[26].main.humidity} %`;
    divWindSpeed5.innerHTML = `${data.list[26].wind.speed} km/h  `;
    divPressure5.innerHTML = `${data.list[26].main.pressure} mBar`;
    todayDate5.innerHTML = finalR5;

    let temperature6 = Math.floor(data.list[34].main.temp - KELVIN);
    divTemperature6.innerHTML = `${temperature6} <span>&#8451;</span>`;
    weatherDesc6.innerHTML = data.list[34].weather[0].description;
    weatherIcon6.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[34].weather[0].icon}@2x.png">`;
    divHumidity6.innerHTML = `${data.list[34].main.humidity} %`;
    divWindSpeed6.innerHTML = `${data.list[34].wind.speed} km/h  `;
    divPressure6.innerHTML = `${data.list[34].main.pressure} mBar`;
    todayDate6.innerHTML = finalR6;

}
