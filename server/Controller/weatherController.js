const fetch = require('node-fetch');


const getWeatherHandler = async (cities) => {
    const results = Promise.all(
        cities.map(async (city) => {
            let weatherInfo;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const responseData = await response.json();
            if(responseData.cod === 200){
                weatherInfo = { [city] : `${(responseData.main.temp - 273.15).toFixed(2)} °C` };
            }
            else{
                weatherInfo = { [city] : responseData.message };
            }
            return weatherInfo;
        })
    );
    return results;
};


const getWeather = (req, res, next) => {
    getWeatherHandler(req.body.cities)
        .then((weatherInfo) => {
            res.json(weatherInfo);
        })
        .catch((err) => {
            const error = err.message || "Something Went Wrong.. Please Try again!!";
            return next(error);
        });
};

exports.getWeather = getWeather

