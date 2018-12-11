
const initialState = {
  orders : {
    firstname : null,
    email : null,
    coffeename : null,
    size : null,
    totalcost : 0
  }
  
}

const reducer = (state = initialState, action) => {
  
  if (action.type === "NEW_ORDER") {

  }
  return state
}

export default reducer;
