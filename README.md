# Weather-App

The purpose of this project was to creat an application that could take user input of a city and use applicable API's (Openweather) to geolocate the correct long/lat to display the weather of that city to the user. It will also give a forecast for the following five days as well as use local storage to create buttons that allow a user to search an old city while retaining up to the minute information on the forecast.

## Usage

When the user types in a city and hits either enter or clicks submit, the API will be called to find the correct lat/longitude for the named city entered by the user. It will then pass this information to a second API call that will return the relevant information for the day and next five days of forecast. This information is then displayed dynamically via JavaScript onto the page for the user to see as well as store the user inputed text within local storage. Local storage is called on every page refresh to dynamically create buttons that will allow the user to click them and pull up the current weather for that previous search.

## Conclusion

In conclusion, this project at first seemed to be easy and quick coming off of our project. But I found a few intracacies that proved to cause some issues for me. I initially struggled with the CSS portion of this project as it is self addmitely my weak point. I was having alot of trouble getting things to look correct and position correct but I realized that by making the boxes in my HTMl to play with I could easily port them over to the JavaScript for dynamic rendering. I feel much more confident in my CSS abilities now. The second issue I ran into was limiting the button creation to a single button even if there are multiple searches for a city. This proved to be a tougher task than expected but with tooling around was solved with trial and error. Overall I would say this project reiterated my confidence in my ability to call APIs and use their info, and helped to solidify my knowledge of CSS and how it can interact with the HTML and JS.

# Screenshot

![Weather Dashboard Screenshot](<assets/WEATHER DASHBOARD.png>)

# Live Link

https://mkelly115.github.io/weather-app/

# Licensing
MIT License within