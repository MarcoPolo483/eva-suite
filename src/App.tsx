import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import DevToolsProductPage from './pages/DevToolsProductPage'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/devtools" element={<DevToolsProductPage />} />
      </Routes>
    </Layout>
  )
}

export default App
