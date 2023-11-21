const apiKey = "5c243c019d1a5677d5ece7969ddd932a";
const getUserCity = document.getElementById('city');
const formEl = document.getElementById("city-search");
let localCity, temp, feelsLike, humidity

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

            let lat = localCity[0].lat
            let lon = localCity[0].lon

            console.log(lat, lon)

            return fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`)
        })
        .then(function(response){

            return response.json()
        })
        .then(function(cityWeather){
            console.log(cityWeather)

        let temp = cityWeather.main.temp
        let feelsLike = cityWeather.main.feels_like
        let humidity = cityWeather.main.humidity

            console.log(temp,feelsLike,humidity)
        })

}

formEl.addEventListener("submit", function (event) {
    event.preventDefault()
    const userCity = getUserCity.value
    console.log(userCity)
    geoLocate(userCity)

});

