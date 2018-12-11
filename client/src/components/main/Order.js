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
            order : {
                totalcost : 0
            },
            coffeelist : [],
            price : {
                small : 3.75,
                medium : 4.55,
                large : 4.75,
                extralarger : 5.95 
            },
            
        }
    }

    componentDidMount = () => {
        axios.get(COFFEE_API_URL).then(response => {
            this.setState({
                ...this.state,
                coffeelist : [response.data.coffees]
            })
        }).catch(e => {
            console.log(e)
        })
    }

    selection = (e) => {
        this.setState({
            ...this.state,
            order : {
                ...this.state.order,
                [e.target.name] : e.target.value
            }
        })
    }

    coffeePrice = (e) => {
        this.setState({
            ...this.state,
            order : {
                ...this.state.order,
                price : parseFloat(e.target.value)

            }
        })
    }







  render() {

    const coffeeName = () => {
        this.state.coffeelist.forEach(coffeeItems => {
            coffeeItems.forEach(coffeeItem => {
                document.getElementById('coffee-name').insertAdjacentHTML("beforeend", `<option value=${coffeeItem.name}>${coffeeItem.name}</option>`) 
            })
        })
    }
    console.log(this.state.order)


    return (
      <div>
        <h1>Order Page</h1>
        <label>First Name</label>
        <input type="text" onChange={this.selection} name="firstname" placeholder="First Name" />
        <label>Email</label>
        <input type="text" onChange={this.selection} name="email" placeholder="Email" />
        <label>Coffee</label>
        <select id="coffee-name" name="coffeename" onChange={this.selection}>
            <option defaultValue>Select Coffee</option>
            {coffeeName()}
        </select>
        <label>Size</label>
        <select name="size" onChange={this.coffeePrice} >
            <option defaultValue>Select Size</option>
            <option value={this.state.price.small}>small ${this.state.price.small}</option>
            <option value={this.state.price.medium}>medium ${this.state.price.medium}</option>
            <option value={this.state.price.large}>large ${this.state.price.large}</option>
            <option value={this.state.price.extralarge}>Extra Large ${this.state.price.extralarge}</option>
        </select>
        <button onClick={() => this.props.createOrder(this.state.order)}>Place Order</button>
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