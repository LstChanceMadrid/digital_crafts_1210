const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name : String,
    email : String,
    coffeeType : String,
    date : {type: Date, default: Date.now},
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order