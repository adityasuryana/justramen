import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Sidebar from '../components/Sidebar'
import { Table } from '../components/Table'

const DashboardPage = () => {
  return (
    <div className='min-h-screen mx-auto bg-background'>
        <AdminNavbar />

        <Table />
    </div>
  )
}

export default DashboardPage