import { Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const titles = {
  '/dashboard':  { title: 'Dashboard',  subtitle: 'Overview of your HR data' },
  '/employees':  { title: 'Employees',  subtitle: 'Manage your workforce' },
  '/attendance': { title: 'Attendance', subtitle: 'Daily attendance tracking' },
  '/reports':    { title: 'Reports',    subtitle: 'Insights and analytics' },
}

export default function TopBar({ onMenuClick }) {
  const { pathname } = useLocation()
  const { title, subtitle } = titles[pathname] || { title: 'HRMS Lite', subtitle: '' }

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center px-6 gap-4 sticky top-0 z-20">
      <button
        className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
        onClick={onMenuClick}
      >
        <Menu size={18} />
      </button>

      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-bold text-slate-800 truncate">{title}</h2>
        <p className="text-xs text-slate-400 truncate hidden sm:block">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-semibold text-slate-700">Admin Panel</p>
          <p className="text-[10px] text-slate-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>
    </header>
  )
}
