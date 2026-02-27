import React from 'react'
import { format } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'

const Row = React.memo(function Row({ emp, onEdit, onDelete }) {
  return (
    <tr className="table-row-hover">
      <td className="px-4 py-3">
        <span className="font-mono text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded font-medium">
          {emp.employee_id}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {emp.full_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-slate-800">{emp.full_name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-slate-600 hidden sm:table-cell">{emp.email}</td>
      <td className="px-4 py-3 hidden md:table-cell">
        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
          {emp.department}
        </span>
      </td>
      <td className="px-4 py-3 text-xs text-slate-400 hidden lg:table-cell">
        {emp.created_at ? format(new Date(emp.created_at), 'MMM dd, yyyy') : '—'}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(emp)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            title="Edit"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(emp)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  )
})

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            {['Emp ID', 'Name', 'Email', 'Department', 'Joined', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {employees.map((emp) => (
            <Row key={emp.id} emp={emp} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
