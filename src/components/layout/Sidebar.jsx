import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, CalendarCheck, BarChart2, X } from 'lucide-react'

const links = [
  { to: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/employees',  label: 'Employees',  icon: Users },
  { to: '/attendance', label: 'Attendance', icon: CalendarCheck },
  { to: '/reports',    label: 'Reports',    icon: BarChart2 },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-60 bg-white border-r border-slate-100 z-40
          flex flex-col transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">H</span>
            </div>
            <span className="font-bold text-slate-800 text-sm tracking-tight">HRMS Lite</span>
          </div>
          <button
            className="md:hidden p-1 rounded-lg text-slate-400 hover:bg-slate-100"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">
            Main Menu
          </p>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-100
                ${isActive
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center">
              <span className="text-brand-700 text-xs font-bold">A</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">Admin</p>
              <p className="text-[10px] text-slate-400">Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
