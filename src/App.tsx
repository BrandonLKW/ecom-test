import { useState } from 'react' ;
import { Route, Routes } from 'react-router-dom';
import * as orderService from '../util/order-service';
import NavBar from '../src/components/NavBar';
import ProductPage from './pages/ProductPage/ProductPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import CartModal from './components/Modal/CartModal';
import PaymentModal from './components/Modal/PaymentModal';
import { Cart } from '../models/Cart';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import "./App.css";

function App() {
  const [cartItemList, setCartItemList] = useState<Cart[]>([])
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const submitOrder = () => {
    //Counting sum of items and creating order item objects
    let cartItemSum = 0;
    const orderItemList = [];
    for (const cartItem of cartItemList){
      cartItemSum += cartItem.calculateSum();
      orderItemList.push(new OrderItem("", "", cartItem.product.unit_price, cartItem.quantity, cartItem.product.product_id));
    }
    //Create order object
    const newOrder = new Order();
    newOrder.user_id = "1";
    newOrder.total_cost = cartItemSum;
    newOrder.status = "PENDING";
    newOrder.orderItemList = orderItemList;

    //Push to db
    const trySubmitOrder = async () => {
      const response = await orderService.addOrder(newOrder);
      console.log(response);
    }
    trySubmitOrder();

    //Clear after successful transaction
    setShowCartModal(false);
    setShowPaymentModal(false);
  }

  return (
    <div className="appbody">
      <NavBar setShowCartModal={setShowCartModal}/>
      <Routes>
        <Route path="/products" element={<ProductPage cartItemList={cartItemList} setCartItemList={setCartItemList}/>}/>
        <Route path="/orders" element={<OrdersPage />}/>
        <Route path="*" element={<ProductPage cartItemList={cartItemList} setCartItemList={setCartItemList}/>}/>
      </Routes>
      <CartModal showModal={showCartModal} setShowModal={setShowCartModal} setShowPaymentModal={setShowPaymentModal} cartItemList={cartItemList} />
      <PaymentModal showModal={showPaymentModal} setShowModal={setShowPaymentModal} submitOrder={submitOrder}/>
    </div>
  )
}

export default App
