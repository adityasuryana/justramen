import { Routes,  Route, Outlet} from 'react-router-dom'
import { SidebarProvider } from './components/ui/sidebar.jsx'

import SidebarLayout from './components/SidebarLayout.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

import {LandingPage} from './pages/LandingPage.jsx'
import {ExploreMenuPage} from './pages/ExploreMenuPage.jsx'
import {MenuPage} from './pages/MenuPage.jsx'
import {InventoryPage} from './pages/InventoryPage.jsx'
import {StockPage} from './pages/StockPage.jsx'
import {PromoPage} from './pages/PromoPage.jsx'
import { AccountPage } from './pages/AccountPage.jsx'
import { Toaster } from 'sonner'


function App() {

  return (
    <div className=''>
      <Toaster position="top-right" richColors closeButton />
      <SidebarProvider>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/explore-menu" element={<ExploreMenuPage />} />

          <Route element={
            <SidebarLayout>
              <Outlet />
            </SidebarLayout>}>
          
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/promo" element={<PromoPage />} />
          </Route>
        </Routes>
      </SidebarProvider>
    </div>
  )
}

export default App