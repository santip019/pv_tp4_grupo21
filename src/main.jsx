import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Product from './assets/components/Product.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Product />
  </StrictMode>,
)
