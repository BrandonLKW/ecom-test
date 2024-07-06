import { useState } from 'react' 
import { Route, Routes } from "react-router-dom";
import NavBar from '../src/components/NavBar'
import ProductPage from './pages/ProductPage/ProductPage'
import CartModal from './components/Modal/CartModal';
import { Cart } from '../models/Cart';
import "./App.css";
import PaymentModal from './components/Modal/PaymentModal';

function App() {
  const [cartItemList, setCartItemList] = useState<Cart[]>([])
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const submitOrder = () => {
    setShowCartModal(false);
    setShowPaymentModal(false);
  }

  return (
    <div className="appbody">
      <NavBar setShowCartModal={setShowCartModal}/>
      <Routes>
        {/* <Route path="/products" element={<ProductPage />}/> */}
        <Route path="*" element={<ProductPage cartItemList={cartItemList} setCartItemList={setCartItemList}/>}/>
      </Routes>
      <CartModal showModal={showCartModal} setShowModal={setShowCartModal} setShowPaymentModal={setShowPaymentModal} cartItemList={cartItemList} />
      <PaymentModal showModal={showPaymentModal} setShowModal={setShowPaymentModal} submitOrder={submitOrder}/>
    </div>
  )
}

export default App
