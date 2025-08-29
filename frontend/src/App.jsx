import React from 'react'
import { Route, Routes } from 'react-router'
import LandingPage from './pages/LandingPage.jsx'
import MenuRamen from './pages/MenuRamen.jsx'
import PromoPage from './pages/PromoPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import AccountPage from './pages/AccountPage.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore-menu" element={<MenuRamen />} />
        <Route path="/promo" element={<PromoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/accounts" element={<AccountPage />} />
      </Routes>
    </div>
  )
}

export default App