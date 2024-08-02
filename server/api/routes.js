/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
// eslint-disable-next-line import/no-extraneous-dependencies
var express = require('express');
var bodyParser = require('body-parser'); // Import body-parser
var formData = require('./formData'); // Assuming formData.js exports an object with data

var optionsData = [
  { text: 'Text 1', value: '1' },
  { text: 'Text 2', value: '2' },
  { text: 'Text 3', value: '3' },
];

var app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.route('/formdata/')
  .get((req, res) => {
    // Ensure formData.data is initialized
    res.send(formData.data || {}); // Send default empty object if no data
  })
  .post((req, res) => {
    formData.data = req.body;
    // Debug log to check posted data
    console.log('Received form data: ', formData.data);
    res.status(200).send();
  });

app.route('/optionsdata/')
  .get((req, res) => {
    res.send(optionsData);
  });

module.exports = app;
