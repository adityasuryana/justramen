import React from 'react'
import { Route, Routes } from 'react-router'
import LandingPage from './pages/LandingPage.jsx'
import MenuRamen from './pages/MenuRamen.jsx'
import PromoPage from './pages/PromoPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import AccountPage from './pages/AccountPage.jsx'
import StockPage from './pages/StockPage.jsx'
import InventoryPage from './pages/InventoryPage.jsx'
import { ProtectedRouted } from './components/ProtectedRouted.jsx'

const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore-menu" element={<MenuRamen />} />

        <Route element={<ProtectedRouted />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/accounts" element={<AccountPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/promo" element={<PromoPage />} />
          <Route path='/stock' element={<StockPage />} />
          <Route path='/inventory' element={<InventoryPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App