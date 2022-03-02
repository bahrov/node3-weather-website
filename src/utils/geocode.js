const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYmFocm92IiwiYSI6ImNrenZiMHQzYTAxN2cydnF1cjIwZXpvY3cifQ.1yzl2QhGBKtU8ihLhfOyyg&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to map box service', undefined);
    } else if (!body.features || body.features.length === 0) {
      callback('Unable to find the location, try again!', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
