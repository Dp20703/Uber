import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import MainContext from './Context/MainContext.jsx'
import CaptainContext from './Context/CaptainContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
      <MainContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MainContext>
    </CaptainContext>
  </StrictMode>
)
