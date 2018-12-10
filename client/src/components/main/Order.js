import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actionCreators'

const COFFEE_API_URL = "https://raw.githubusercontent.com/CoffeeJson/json/gh-pages/coffee.json"

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            order : [],
            coffeeList : [],
            size : {
                small : 3.75,
                medium : 4.55,
                large : 4.75,
                extraLarge : 5.95 
            },
            totalCost : 0
        }
    }

    componentDidMount = () => {
        axios.get(COFFEE_API_URL).then(response => {
            this.setState({
                ...this.state,
                coffeeList : [response.data.coffees]
            })
        }).catch(e => {
            console.log(e)
        })
    }


  render() {

    const coffeeName = () => {
        this.state.coffeeList.forEach(coffeeItems => {
            coffeeItems.forEach(coffeeItem => {
                document.getElementById('coffee-name').insertAdjacentHTML("beforeend", `<option value=${coffeeItem.name}>${coffeeItem.name}</option>`) 
            })
        })
    }



    return (
      <div>
        <h1>Order Page</h1>
        <label>First Name</label>
        <input type="text" onChange={this.createOrder} name="firstname" placeholder="First Name" />
        <label>Email</label>
        <input type="text" onChange={this.createOrder} name="email" placeholder="Email" />
        <label>Coffee</label>
        <select id="coffee-name" name="coffeename" onChange={this.createOrder}>
            <option defaultValue>Select Coffee</option>
            {coffeeName()}
        </select>
        <label>Size</label>
        <select name="size" onChange={this.coffeePrice} >
            <option defaultValue>Select Size</option>
            <option value={this.state.size.small}>small ${this.state.size.small}</option>
            <option value={this.state.size.medium}>medium ${this.state.size.medium}</option>
            <option value={this.state.size.large}>large ${this.state.size.large}</option>
            <option value={this.state.size.extraLarge}>extraLarge ${this.state.size.extraLarge}</option>
        </select>
        <button onClick={this.sendOrder}>Place Order</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendOrder : () => dispatch(actionCreators.createOrder())
    }
}

export default connect(null, mapDispatchToProps)(Order)