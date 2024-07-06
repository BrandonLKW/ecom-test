import { useState } from 'react' 
import { Route, Routes } from "react-router-dom";
import NavBar from '../src/components/NavBar'
import ProductPage from './pages/ProductPage/ProductPage'
import "./App.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="appbody">
      <NavBar />
      <Routes>
        {/* <Route path="/products" element={<ProductPage />}/> */}
        <Route path="*" element={<ProductPage />}/>
      </Routes>
    </div>
  )
}

export default App
