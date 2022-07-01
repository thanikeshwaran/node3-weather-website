const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=d285e12a33e1db74317fb665ac814eed&query=' + lat + ',' + long + '&units=f';

  request({ url, json: true }, (error, {body}) => {

    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. But it feels like it is " +
          body.current.feelslike +
          " degrees"
      );
    }
  });
};

module.exports = forecast;
