const apiKey = "5c243c019d1a5677d5ece7969ddd932a";
const getUserCity = document.getElementById('city');
const formEl = document.getElementById("city-search");
let localCity, temp, feelsLike, humidity, cityName, lat, lon

function geoLocate(city) {
    let cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey
    console.log(cityUrl)
    fetch(cityUrl)
        .then(function (response) {

            return response.json()
        })
        .then(function (localCity) {

            cityApiResults = localCity
            console.log(localCity)

            lat = localCity[0].lat
            lon = localCity[0].lon

            console.log(lat, lon)

            return fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`)
        })
        .then(function (response) {

            return response.json()

        })

        .then(function (cityWeather) {
            let temp = cityWeather.main.temp;
            let feelsLike = cityWeather.main.feels_like;
            let humidity = cityWeather.main.humidity;
            let cityName = cityWeather.name;
            let windSpeed = cityWeather.wind.speed
            let weatherIcon = cityWeather.weather[0].icon
            let icon = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
            // THIS ALSO NEEDS DAY.JS - BE BETTER
            console.log(cityWeather)

            displayWeatherInfo(temp, feelsLike, humidity, cityName, icon, windSpeed);

            return fetch(`https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`)
        })
        .then(function (response) {

            console.log(response)
            return response.json()

        })
        .then(function (fiveDay) {
            let fiveDayTemps = [];
            let fiveDayHumidities = [];
            let fiveDayWindSpeeds = [];
            let fiveDayIcons = [];
            let fiveDayDates = [];

            console.log(fiveDay);

            for (let i = 0; i < 6; i++) {
                const forecast = fiveDay.list[i];
                const temperature = forecast.main.temp;
                const humidity = forecast.main.humidity
                const windSpeed = forecast.wind.speed
                const icons = "https://openweathermap.org/img/wn/" + forecast.weather[0].icon + "@2x.png"
                const date = dayjs(forecast.dt_txt).format('MMMM D, YYYY');

                fiveDayTemps.push(temperature);
                fiveDayHumidities.push(humidity);
                fiveDayWindSpeeds.push(windSpeed);
                fiveDayIcons.push(icons)
                fiveDayDates.push(date)

                console.log(fiveDayTemps);
                console.log(fiveDayHumidities);
                console.log(fiveDayWindSpeeds);
                console.log(fiveDayIcons);
                console.log(fiveDayDates)

                displayFiveDay(fiveDayHumidities, fiveDayWindSpeeds, fiveDayIcons, fiveDayTemps, fiveDayDates)
            }
        })


        .catch(function (error) {
            console.error("Error fetching data:", error);
            // Display an error message on the page
            displayError("Unable to fetch weather data. Please try again.");
        });

}
// Below is a Proof of concept for displaying info for the 5 day.
function displayWeatherInfo(temp, feelsLike, humidity, cityName, icon, windSpeed,) {
    const weatherContainer = document.querySelector(".card-body");
    var today = dayjs().format('MMM D, YYYY');

    weatherContainer.innerHTML = `
        <h4 class="mb-1 sfw-normal">${cityName}<br>${(today)}</h4>
        <p class="mb-2">Current temperature: <strong>${temp} °F</strong></p>
        <p>Feels like: <strong>${feelsLike} °F</strong></p>
        <p>Humidity: <strong>${humidity}%</strong></p>
        <p>Wind Speed: <strong>${windSpeed} MPH </strong></p>

        <div class="d-flex flex-row align-items-center">
            <p class="mb-0 me-4"><img src=${icon}></p>
            <i class="fas fa-cloud fa-3x" style="color: #eee;"></i>
        </div>
    `;
}


function displayFiveDay(fiveDayHumidities, fiveDayWindSpeeds, fiveDayIcons, fiveDayTemps, fiveDayDates) {
    const fiveDayConatiner = document.querySelector(".py-5")

    fiveDayConatiner.innerHTML = `
    <div class="d-flex justify-content-between">
    <div class="forecast-container">
      <div class="forecast-box">
      <p> <strong> ${fiveDayDates[1]} </strong> </p>
      <p>Temp: <strong> ${fiveDayTemps[0]}</strong> </p>
      <p>Humidity: <strong>${fiveDayHumidities[0]}%</strong></p>
      <p>Wind Speed: <strong>${fiveDayWindSpeeds[0]} MPH</strong> </p>
      <p><img src=${fiveDayIcons[0]}> </p>
      </div>
      <div class="forecast-box">
      <p> <strong> ${fiveDayDates[2]} </strong> </p>
      <p>Temp: <strong>${fiveDayTemps[1]}</strong> </p>
      <p>Humidity:<strong> ${fiveDayHumidities[1]}%</strong></p>
      <p>Wind Speed:<strong> ${fiveDayWindSpeeds[1]} MPH</strong> </p>
      <p> <img src=${fiveDayIcons[1]}> </p>
      </div>
      <div class="forecast-box">
      <p> <strong> ${fiveDayDates[3]} </strong> </p>
      <p>Temp:<strong> ${fiveDayTemps[2]}</strong> </p>
      <p>Humidity:<strong> ${fiveDayHumidities[2]}%</strong></p>
      <p>Wind Speed:<strong> ${fiveDayWindSpeeds[2]} MPH </strong></p>
      <p> <img src=${fiveDayIcons[2]}> </p>
      </div>
      <div class="forecast-box">
      <p> <strong> ${fiveDayDates[4]} </strong> </p>
      <p>Temp:<strong> ${fiveDayTemps[3]}</strong> </p>
      <p>Humidity:<strong> ${fiveDayHumidities[3]}%</strong></p>
      <p>Wind Speed:<strong> ${fiveDayWindSpeeds[3]} MPH </strong></p>
      <p><img src=${fiveDayIcons[3]}> </p>
      </div>
      <div class="forecast-box">
      <p> <strong> ${fiveDayDates[5]} </strong> </p>
      <p>Temp:<strong> ${fiveDayTemps[4]} </strong></p>
      <p>Humidity:<strong> ${fiveDayHumidities[4]}%</strong></p>
      <p>Wind Speed:<strong> ${fiveDayWindSpeeds[4]} MPH</strong> </p>
      <p><img src=${fiveDayIcons[4]}> </p>
      </div>
    </div>
  </div>`
}

function saveUserCitiesToLocalStorage(cities) {
    localStorage.setItem('userCities', JSON.stringify(cities));
}


// Display Error function for inner HTML
// function displayError(message) {
//     weatherContainer.innerHTML = `<p class="error">${message}</p>`;
// }

formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    const userCity = getUserCity.value;
    const existingUserCities = JSON.parse(localStorage.getItem('userCities')) || [];
    existingUserCities.push(userCity);
    saveUserCitiesToLocalStorage(existingUserCities);
    geoLocate(userCity);
    

});
// Will need to iterate and compare existing storage and not allow a copy of the storage when creating the buttons for local storage

// could use something to add a .notation 5 day weather forcast to the existing variable that will hold temp, humidity, feels like, ect //