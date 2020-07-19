const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=629d909796002f47d1d695afd39aaea7&query=${latitude},${longitude}`;

    request( {url, json: true} , (error, { body:data } = {}) => {
        if(error)
        {
            callback('Unable to reach weather service!', undefined);
        } else if(data.error)
        {
            callback('Location not found. Please try again with diferent search terms.', undefined);
        } else {
            const currentTemp = data.current.temperature;
            const feelsLike = data.current.feelslike;
            const description = data.current.weather_descriptions;
            callback(undefined, `${description[0]} with current temperature ${currentTemp} degrees, however it feels like ${feelsLike} degrees out there.`);
        };
    })
}

module.exports = forecast;
