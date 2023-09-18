import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './Components/NavBar/NavBar'
import ProductList from './Components/Product/ProductList'
import ProductDetail from './Components/Product/ProductDetail' 
import Cart from './Components/Cart/cart'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/home/home'
import Profile from './Components/Users/profile'
import Register from './Components/Users/register'


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/users" element={<Profile />} />
        <Route path="/session" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
