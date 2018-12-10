const mongoose = require('mongoose');

// const db = mongoose.connection;
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

const axios = require('axios');

const COFFEE_API_URL = "https://raw.githubusercontent.com/CoffeeJson/json/gh-pages/coffee.json"

app.get('/coffee', (req, res) => {
    axios.get(COFFEE_API_URL)
  .then(response => {
      console.log(response.data)
    res.json({coffeeList : response.data})
  })
  .catch(error => {
    console.log(error);
  });
})


mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get











app.listen(PORT, () => console.log("Node Server Is Running"))