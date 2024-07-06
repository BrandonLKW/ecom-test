import { useState } from 'react' 
import { Route, Routes } from "react-router-dom";
import NavBar from '../src/components/NavBar'
import ProductPage from './pages/ProductPage/ProductPage'
import CartModal from './components/Modal/CartModal';
import { Cart } from '../models/Cart';
import "./App.css";

function App() {
  const [cartItemList, setCartItemList] = useState<Cart[]>([])
  const [showCartModal, setShowCartModal] = useState<boolean>(false);

  return (
    <div className="appbody">
      <NavBar setShowCartModal={setShowCartModal}/>
      <Routes>
        {/* <Route path="/products" element={<ProductPage />}/> */}
        <Route path="*" element={<ProductPage cartItemList={cartItemList} setCartItemList={setCartItemList}/>}/>
      </Routes>
      <CartModal showModal={showCartModal} setShowModal={setShowCartModal} cartItemList={cartItemList} />
    </div>
  )
}

export default App
