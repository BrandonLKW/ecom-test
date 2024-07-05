import { useState } from 'react'
import NavBar from '../src/components/NavBar'
import MainPage from '../src/pages/MainPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NavBar />
      <MainPage />
    </div>
  )
}

export default App
