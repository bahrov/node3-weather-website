const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=77be9223a4db40721120b7446a8f1b15&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const { temperature, feelslike: feelsLike } = body.current;
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature,
        feelsLike,
      });
    }
  });
};

module.exports = forecast;
