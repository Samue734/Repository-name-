import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { OrganizationScreen } from './screens/OrganizationScreen'
import { BookingScreen } from './screens/BookingScreen'
import { MaintenanceScreen } from './screens/MaintenanceScreen'

export const App: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/organization" replace />} />
        <Route path="/organization" element={<OrganizationScreen />} />
        <Route path="/booking" element={<BookingScreen />} />
        <Route path="/maintenance" element={<MaintenanceScreen />} />
      </Routes>
    </AppLayout>
  )
}

export default App
