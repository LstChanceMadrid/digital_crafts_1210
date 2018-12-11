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



  render() {

    let orderItems = this.state.orders.map((order, index) => {
        return <li key={order._id}>{order.name}, {order.email}, {order.coffeeType}, {order._id}, {order.date}</li>
    })

    return (
      <div>
        <h1>Order Page</h1>
        <label>Name</label>
        <input type="text" name="name" placeholder="Name" />
        <label>Email</label>
        <input type="text"  name="email" placeholder="Email" />
        <label>Coffee Type</label>
        <select id="coffee-type" name="coffeeType">
            <option defaultValue>Select Coffee</option>
            <option value="Hot">Hot</option>
            <option value="Ice">Ice</option>
        </select>
        <label>Size</label>
        {/* <select name="size" >
            <option defaultValue>Select Size</option>
            <option value>small $</option>
            <option value>medium $</option>
            <option value>large $</option>
            <option value>Extra Large $</option>
        </select> */}
        <button>Place Order</button>
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