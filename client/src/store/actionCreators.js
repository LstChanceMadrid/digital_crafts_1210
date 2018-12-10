import axios from 'axios'


export const newOrder = (order) => {
    return {
        type : "NEW_ORDER",
        order
    }
}
export const createOrder = () => {
    return dispatch => {
        axios.post("http://localhost:5000/api/order", {
            

        })
    }
}


