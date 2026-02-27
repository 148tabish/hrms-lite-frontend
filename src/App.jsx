import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import DashboardPage  from './pages/DashboardPage'
import EmployeesPage  from './pages/EmployeesPage'
import AttendancePage from './pages/AttendancePage'
import ReportsPage    from './pages/ReportsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard"  element={<DashboardPage />} />
          <Route path="employees"  element={<EmployeesPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="reports"    element={<ReportsPage />} />
          <Route path="*"          element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
