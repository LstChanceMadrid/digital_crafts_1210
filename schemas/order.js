const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    firstname : "string",
    email : "string",
    coffeename : "string",
    price : "decimal",
    date : 'date',
    totalprice : "decimal"
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order