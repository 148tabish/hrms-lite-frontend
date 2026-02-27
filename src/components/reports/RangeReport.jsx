import { format } from 'date-fns'
import Badge from '../ui/Badge'

export default function RangeReport({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            {['Employee', 'Date', 'Status'].map((h) => (
              <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((row, i) => (
            <tr key={i} className="table-row-hover">
              <td className="px-4 py-3 text-sm font-medium text-slate-800">{row.full_name}</td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {format(new Date(row.date), 'MMM dd, yyyy')}
              </td>
              <td className="px-4 py-3">
                <Badge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
