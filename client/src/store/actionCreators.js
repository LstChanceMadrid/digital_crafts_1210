import axios from 'axios'


export const newOrder = (order) => {
    return {
        type : "NEW_ORDER",
        order
    }
}
export const createOrder = (order) => {
    console.log('inside 1st action creator')
    return dispatch => {
        axios.post("http://localhost:5000/api/order/", {
            order : {
                coffeename : order.coffeename,
                email : order.email,
                firstname : order.firstname,
                price : order.price,
                totalcost :  order.totalcost + order.price
            }
        }).then(response => {
            console.log(response.data)
        }).catch(e => {
            console.log(e)
        })
        dispatch(newOrder(order))
    }
}


