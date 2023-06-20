import {useContext, useReducer, useEffect, createContext} from 'react';
import cartItems from './data';
import reducer from './reducers/reducer';
import { CLEAR_CART,REMOVE, INCREASE, DECREASE, LOADING, DISPLAY_ITEMS } from './actions/action';
import { getTotal } from './utils';

// I will using OBJECT instead of array in terms in data structure due to following reason:
// efficient for lookups and updates, especially for larger datasets.
// The downsides of using an object to store shopping cart data include 
// the risk of unintended property overwriting or unexpected behavior when 
// iterating over inherited properties. Additionally, objects can only use 
// string keys, which can be limiting if you need to use non-string keys. 
// Deleting properties from an object can also be tricky, 
// especially when dealing with inherited properties.

//  const sample = new Map();
// see readme file for many usefull methods for map() built in method;

 // Steps in the Map() method:
  // 1. the data will iterate as Map datatype. see this at context.jsx for the sample:
  //    -cart : new Map(cartItems.map((item)=> [item.id,item])) <----this
  //    - above is making the array in to map data type to add a key in every values called key-value pairs. 
  // 2. the data will be back to array data type. then every value containing key and value(key-value pairs).
  //    -const cartArray = Array.from(cart.entries()); cart is a map data type.
  // 3. easiest part, you can use now to show/iterate the data. every value has [string, item]. this string is copy in the id. you can use as key id.
  
const AppContext = createContext(); // this is to create a context.

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const initialState = {
    loading: false,
    // cart : new Map(cartItems.map((item)=> [item.id,item])), // this is being used for build in data in data.jsx
                                                             // this will be change in fetching data.
    cart: new Map(),
                                                            } 

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {totalAmount, totalCost} = getTotal(state.cart);
    
    const clearCart = () => {
        dispatch({type: CLEAR_CART});
    } 

    const removeItem = (id) => {
        dispatch({type: REMOVE, id})
    }

    const increase = (id) => {
        dispatch({type: INCREASE, id})
    }

    const decrease = (id) => {
        dispatch({type: DECREASE, id})
    }
    
    const fetchData = async () => {
        dispatch({type: LOADING});
      try {
        const response = await fetch(url);
        if(!response.ok) { //if their is error during fetching run the inside code
            dispatch({type: LOADING}); //set loading to true
            console.log('error in fetching data')
            return
        }
        const fetchCartData = await response.json();
        dispatch({type: DISPLAY_ITEMS, fetchCartData });
        
      } catch (error) {
        throw new Error('Error fetching data');
        dispatch({type: LOADING});
      }

    }

    useEffect(()=>{
        fetchData();
    },[]);

    return (
        <AppContext.Provider 
        value={{...state, 
                clearCart, 
                removeItem,
                increase, 
                decrease,
                totalAmount,
                totalCost,
                }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);