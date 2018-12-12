import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actionCreators'

// const COFFEE_API_URL = "https://raw.githubusercontent.com/CoffeeJson/json/gh-pages/coffee.json"



class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            orders : []
            
        }
    }

    componentDidMount = () => {

        const ALL_ORDERS_URL = "http://localhost:3000/coffee/orders"

        axios.get(ALL_ORDERS_URL).then(response => {
            this.setState({
                ...this.state,
                orders : response.data
            })
        }).catch(e => {
            console.log(e)
        })
    }

    placeOrder = () => {
        const PLACE_ORDER_URL = "http://localhost:5000/place-order"
        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        let coffeeType = document.getElementById('coffee-type').value
        
        axios.post(PLACE_ORDER_URL, {
            name : name,
            email : email,
            coffeeType : coffeeType
        }).then(response => {
            this.setState({
                ...this.state,
                orders : [
                    ...this.state.orders,
                    response.data
                ]
            })
        })
    }





    updateCoffee = (orderId) => {
        // make a fetch post with the orderId in the url
        const UPDATE_ORDER_URL = `http://localhost:5000/update/${orderId}/order`
        let name = document.getElementById(orderId + "-name").value
        let email = document.getElementById(orderId + "-email").value
        let coffeeType = document.getElementById(orderId + "-coffee-type").value

        axios.post(UPDATE_ORDER_URL, {
            name : name,
            email : email,
            coffeeType : coffeeType
        }).then(response => {
            console.log(response)
        })
            
    }

    showUpdateForm = () => {
        document.getElementsByClassName('update-form').display = "flex"
    }


  render() {

    let orderItems = this.state.orders.map((order, index) => {
        return (
        <li key={order._id}>{order.name}, {order.email}, {order.coffeeType}, {order._id}, {order.date} <button onClick={this.showUpdateForm}>Update</button><button>cancel order</button>
        <div className="update-form">
            <label>Name</label>
            <input id={`${order._id}-name`} type="text" name="name" defaultValue={order.name} placeholder="Name" />
            <label>Email</label>
            <input id={`${order._id}-email`} type="text"  name="email" defaultValue={order.email} placeholder="Email" />
            <label>Coffee Type</label>
            <select id={`${order._id}-coffee-type`} name="coffeeType">
                <option defaultValue>{order.coffeeType}</option>
                <option value="Hot">Hot</option>
                <option value="Ice">Ice</option>
            </select>
            <button onClick={() => this.updateCoffee(order._id)}>Confirm Update</button>
        </div>
        </li>)
    })

    return (
      <div>
        <h1>Order Page</h1>
        <label>Name</label>
        <input id="name" type="text" name="name" placeholder="Name" />
        <label>Email</label>
        <input id="email" type="text"  name="email" placeholder="Email" />
        <label>Coffee Type</label>
        <select id="coffee-type" name="coffeeType">
            <option defaultValue>Select Coffee</option>
            <option value="Hot">Hot</option>
            <option value="Ice">Ice</option>
        </select>
        <button onClick={this.placeOrder}>Place Order</button>
        <ul>
            {orderItems}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        orders : state.orders
    }
}

const mapDispatchToProps = dispatch => {
    console.log('inside dispatch')
    return {
        createOrder : (order) => dispatch(actionCreators.createOrder(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)