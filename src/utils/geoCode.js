const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmFzaGkxNzA1IiwiYSI6ImNrY2VtNXdxMDA3YzYzNXBmaDRqMjFraG8ifQ.9W8AoFNKO3qmeqaTz_TYVg&limit=1`;
    request( {url , json:true} , (error, { body:data} = {}) => {
        if(error)
        {
            callback('Unable to connect to map services!', undefined);
        }
        else if(data.features.length == 0)
        {
            callback('Unable to find location. Try again with different search terms.', undefined);
        } else {
            callback(undefined, {
                longitude: data.features[0].center[0],
                latitude: data.features[0].center[1],
                placeName : data.features[0].place_name
            })
        } 
    });
}

module.exports = geocode;