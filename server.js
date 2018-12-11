const axios = require('axios');
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose');
const Order = require('./schemas/order')

const db = mongoose.connection;
const PORT = process.env.PORT || 5000

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost/coffeedb', { useNewUrlParser: true });


db.on('error', console.error.bind(console, 'connection error:'))


db.once('open', () => {
    console.log('connected to mongodb')
})


// const COFFEE_API_URL = "https://raw.githubusercontent.com/CoffeeJson/json/gh-pages/coffee.json"


app.post("/coffee", (req, res) => {
    let coffeeType = req.body.coffeeType
    let email = req.body.email
    let name = req.body.name

    let order = new Order({name : name, email : email, coffeeType : coffeeType})

    order.save((error, newOrder) => {
        res.json(newOrder)
        return
    })
})


app.get('/coffee/orders', (req, res) => {
    Order.find({},(error, orders) => {
        res.json(orders)
    })
})











app.listen(PORT, () => console.log("Node Server Is Running"))