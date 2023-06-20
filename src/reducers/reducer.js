import {CLEAR_CART,REMOVE, INCREASE, DECREASE, LOADING, DISPLAY_ITEMS } from './../actions/action';

const reducer = (state, action) => {

    let newCart = new Map(state.cart); // making a new Map is to maker sure not mutating the existing state.
                                        // we will make another map variable and update the state.
    let item = '';
    let newItem ='';                                    
    switch (action.type) {
        case CLEAR_CART:
            return {...state, cart: new Map() }; // new Map is clearing inside the Map().
        case REMOVE:
                // getting new Map() newCart declared above. see the notes.
                newCart.delete(action.id); // action.id is the pass id in dispatch pair in the type: 'SOMETHING'.
            return {...state, cart: newCart};

        case INCREASE:
             // getting new Map() newCart declared above. see the notes.
                item = newCart.get(action.id); // action.id is the pass id in dispatch pair in the type: 'SOMETHING'.
                                                    // get the specific value equal to id(key);
                newItem = {...item, amount: item.amount + 1} // updating the amount property inside the item value.
                newCart.set(action.id, newItem); //updating the created new Map(), two values need (key, newItem) will find the key and the item their will be updated.
                                                 
            return {...state, cart: newCart}; // updating the new cart.

        case DECREASE:
            // getting new Map() newCart declared above. see the notes.
                item = newCart.get(action.id); // action.id is the pass id in dispatch pair in the type: 'SOMETHING'.
                if(item.amount === 1){
                    newCart.delete(action.id);
                    return {...state, cart: newCart};
                }                                    // get the specific value equal to id(key);
                newItem = {...item, amount: item.amount - 1} // updating the amount property inside the item value.
                newCart.set(action.id, newItem); //updating the created new Map(), two values need (key, newItem) will find the key and the item their will be updated.
            return {...state, cart: newCart}; // updating the new cart.
        case LOADING:
            
            return {...state, loading: true} ;   
        case DISPLAY_ITEMS:
            
                newCart = new Map(action.fetchCartData.map((item)=> [item.id, item])); 
                //new state value like in the initial state in the useContext.jsx
                // the difference, in the context.jsx initialState function, here we are fetching data that why we use reducer to move here the array data and make it a map data type.

            return {...state, loading: false, cart: newCart} ;       
        }

    return state;
}

export default reducer;