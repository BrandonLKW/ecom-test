import { createContext, useEffect, useState } from 'react' ;
import { Route, Routes } from 'react-router-dom';
import NavBar from '../src/components/NavBar';
import ProductPage from './pages/ProductPage/ProductPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import { Cart } from '../models/Cart';
import { User } from '../models/User';
import "./App.css";

export const UserContext = createContext(new User());

function App() {
  const [user, setUser] = useState<User>(new User());
  const [cartItemList, setCartItemList] = useState<Cart[]>([])

  useEffect(() => {
    const cartStr = localStorage.getItem("ecomtest_cart" + user.user_id);
    if (cartStr){
      //JSON parse does not convert to Cart object, so manually do this for now
      const storedList = JSON.parse(cartStr);
      const convertedList = [];
      for (const obj of storedList){
        convertedList.push(new Cart(user.user_id, obj.quantity, obj.product));
      }
      setCartItemList(convertedList);
    }
  }, []);

  //save cart as local storage for now
  const saveCart = (cartItemList: Cart[]) => {
    if (cartItemList?.length > 0){
      localStorage.setItem("ecomtest_cart" + user.user_id, JSON.stringify(cartItemList)); //use userid as psuedo uid
      setCartItemList(cartItemList);
    }
  };

  return (
    <UserContext.Provider value={user}>
      <div className="appbody">
        <NavBar cartItemList={cartItemList} setCartItemList={saveCart} setUser={setUser}/>
        <Routes>
          <Route path="/products" element={<ProductPage cartItemList={cartItemList} setCartItemList={saveCart}/>}/>
          {user.user_id !== "0" ? 
            <Route path="/orders" element={<OrdersPage setCartItemList={saveCart}/>}
            {...user.account_type === "RESTRICTED" ? <Route path="/history"/> : <></>}/> 
          : 
          <></>}
          <Route path="*" element={<ProductPage cartItemList={cartItemList} setCartItemList={saveCart}/>}/>
        </Routes>
        
      </div>
    </UserContext.Provider>
  )
}

export default App
