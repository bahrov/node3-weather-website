const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const { response } = require('express');

const app = express();

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Maksym Bahrov',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Maksym Bahrov',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Lorem ipsum',
    title: 'Help',
    name: ' Maksym Bahrov',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address',
    });
  }

  geocode(
    req.query.address,
    (error, { location, longitude, latitude } = {}) => {
      if (error) {
        return res.send({ error });
      } else {
        forecast(longitude, latitude, (error, response) => {
          if (error) {
            return res.send(error);
          } else {
            return res.send({
              location,
              address: req.query.address,
              forecast: response,
            });
          }
        });
      }
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Maksym Bahrov',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Maksym Bahrov',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 300');
});
