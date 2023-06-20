// components
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { AppProvider, useGlobalContext } from './context';
 
function App() {
   const {loading} = useGlobalContext();

   if(loading){
    return (
      <main style={{marginTop: '5rem'}}>
        <div className='loading' ></div>
      </main>
      );
   }
  return (
    <main>
      <Navbar />
      <CartContainer />
      
    </main>
  );
}

export default App;
