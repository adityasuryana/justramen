import React from 'react'
import { Route, Routes } from 'react-router'
import LandingPage from './pages/LandingPage.jsx'
import MenuRamen from './pages/MenuRamen.jsx'
import PromoPage from './pages/PromoPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuRamen />} />
        <Route path="/promo" element={<PromoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  )
}

export default App