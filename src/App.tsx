import { createContext, useState } from 'react' ;
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

  return (
    <UserContext.Provider value={user}>
      <div className="appbody">
        <NavBar cartItemList={cartItemList} setCartItemList={setCartItemList} setUser={setUser}/>
        <Routes>
          <Route path="/products" element={<ProductPage cartItemList={cartItemList} setCartItemList={setCartItemList}/>}/>
          {user.user_id !== "0" ? 
            <Route path="/orders" element={<OrdersPage setCartItemList={setCartItemList}/>}
            {...user.account_type === "RESTRICTED" ? <Route path="/history"/> : <></>}/> 
          : 
          <></>}
          <Route path="*" element={<ProductPage cartItemList={cartItemList} setCartItemList={setCartItemList}/>}/>
        </Routes>
        
      </div>
    </UserContext.Provider>
  )
}

export default App
