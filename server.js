const mongoose = require('mongoose');

const db = mongoose.connection;
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const axios = require('axios');

const Order = require('./schemas/order')

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
    console.log('connected to mongodb')
})

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




const COFFEE_API_URL = "https://raw.githubusercontent.com/CoffeeJson/json/gh-pages/coffee.json"




app.get('/coffee', (req, res) => {
    axios.get(COFFEE_API_URL)
  .then(response => {
      console.log(response.data)
    res.json({coffeelist : response.data})
  })
  .catch(error => {
    console.log(error);
  });
})

app.post("http://localhost:5000/api/order/:orderId", (req, res) => {
    console.log('inside server')
    let orderId = req.params.orderId
    console.log(orderId)
    let coffeename = req.body.order.coffeename
    let email = req.body.order.email
    let firstname = req.body.order.firstname
    let price = req.body.order.price
    let totalprice = req.body.order.totalprice

    Order.findByIdAndUpdate(orderId,{coffeename : coffeename, email: email, firstname : firstname, price : price, totalprice : totalprice}, {new: true},(error, updatedOrder) => {
        res.json(updatedOrder)
    })


})









app.listen(PORT, () => console.log("Node Server Is Running"))