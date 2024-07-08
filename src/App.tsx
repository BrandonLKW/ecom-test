import { createContext, useEffect, useState } from 'react' ;
import { Route, Routes } from 'react-router-dom';
import * as userService from "../util/user-service";
import NavBar from '../src/components/NavBar';
import MainPage from './pages/MainPage/MainPage';
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
    //Check if previously logged user's token is valid
    const token = userService.getToken();
    if (token){
      setUser(new User(token.user.user_id, token.user.name, token.user.email, token.user.password, token.user.address, token.user.account_type));
    }
  }, []);

  useEffect(() => {
    //For now, regardless of user's previous cart, always overwrite with existing cart if any
    if (cartItemList.length > 0){
      saveCart(cartItemList);
      localStorage.removeItem("ecomtest_cart0");//delete unlogged user cart
    } else{
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
    }
  }, [user]);

  //save cart as local storage for now
  const saveCart = (cartItemList: Cart[]) => {
    if (cartItemList?.length > 0){
      localStorage.setItem("ecomtest_cart" + user.user_id, JSON.stringify(cartItemList)); //use userid as psuedo uid
      setCartItemList(cartItemList);
    } else{
      localStorage.removeItem("ecomtest_cart" + user.user_id);
      setCartItemList([]);
    }
  };

  return (
    <UserContext.Provider value={user}>
      <div className="appbody">
        <NavBar cartItemList={cartItemList} setCartItemList={saveCart} setUser={setUser}/>
        <Routes>
          <Route path="/products" element={<ProductPage cartItemList={cartItemList} setCartItemList={saveCart}/>}/>
          {user.user_id !== "0" ? 
            <Route path="/orders" element={<OrdersPage cartItemList={cartItemList} setCartItemList={saveCart}/>}
            {...user.account_type === "RESTRICTED" 
            ? 
            <Route path="/history"/> 
            : 
            <></>}/> 
          : 
          <></>}
          <Route path="*" element={<MainPage />}/>
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App
