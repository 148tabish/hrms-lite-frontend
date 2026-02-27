import React, { useState } from 'react'
import { format } from 'date-fns'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import Badge from '../ui/Badge'
import { useAttendance } from '../../hooks/useAttendance'
import toast from 'react-hot-toast'

const Row = React.memo(function Row({ record, employees, onDeleted }) {
  const { updateAttendanceStatus, deleteAttendance, loadingUpdate, loadingDelete } = useAttendance()
  const [editing, setEditing] = useState(false)
  const [newStatus, setNewStatus] = useState(record.status)

  const emp = employees.find((e) => e.id === record.employee_id)

  const handleSave = async () => {
    try {
      await updateAttendanceStatus(record.id, newStatus)
      toast.success('Status updated')
      setEditing(false)
    } catch (err) {
      toast.error(err || 'Failed to update')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteAttendance(record.id)
      toast.success('Record deleted')
      onDeleted?.()
    } catch (err) {
      toast.error(err || 'Failed to delete')
    }
  }

  return (
    <tr className="table-row-hover">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {(emp?.full_name || '?').charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-slate-800">{emp?.full_name || '—'}</span>
        </div>
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        <span className="font-mono text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
          {emp?.employee_id || '—'}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">
        {format(new Date(record.date), 'MMM dd, yyyy')}
      </td>
      <td className="px-4 py-3">
        {editing ? (
          <div className="flex items-center gap-2">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="input-base py-1 text-xs w-28"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
            <button onClick={handleSave} disabled={loadingUpdate}
              className="p-1 rounded text-emerald-600 hover:bg-emerald-50">
              <Check size={14} />
            </button>
            <button onClick={() => setEditing(false)}
              className="p-1 rounded text-slate-400 hover:bg-slate-100">
              <X size={14} />
            </button>
          </div>
        ) : (
          <Badge status={record.status} />
        )}
      </td>
      <td className="px-4 py-3">
        {!editing && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </td>
    </tr>
  )
})

export default function AttendanceTable({ records, employees }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            {['Employee', 'Emp ID', 'Date', 'Status', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {records.map((r) => (
            <Row key={r.id} record={r} employees={employees} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
