import CartItem from './CartItem';
import { useGlobalContext } from './../context';

const CartContainer = () => {

  const {cart, clearCart,totalCost} = useGlobalContext(); // this is return Map data type
  const cartArray = Array.from(cart.entries()); // wrap each every data to array and turn data type to array.

  // Steps in the Map() method:
  // 1. the data will iterate as Map datatype. see this at context.jsx for the sample:
  //    -cart : new Map(cartItems.map((item)=> [item.id,item])) <----this
  //    - above is making the array in to map data type to add a key in every values called key-value pairs. 
  // 2. the data will be back to array data type. then every value containing key and value(key-value pairs).
  //    -const cartArray = Array.from(cart.entries()); cart is a map data type.
  // 3. easiest part, you can use now to show/iterate the data. every value has [string, item]. this string is copy in the id. you can use as key id.


 
  if (cartArray.length === 0) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArray.map((cartItem) => {
          const [id, item] = cartItem;
          
          return <CartItem key={id} {...item} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className='cart-total'>
             total <span>${totalCost.toFixed(2)}</span>  {/*totalCost.toFixed(2) is showing 2 decimal places*/}
          </h5>
        </div>
        <button
          className='btn btn-hipster'
          onClick={clearCart}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
