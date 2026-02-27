import Badge from '../ui/Badge'

export default function SummaryTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            {['Emp ID', 'Name', 'Department', 'Present', 'Absent', 'Rate'].map((h) => (
              <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((row) => {
            const total = (row.total_present || 0) + (row.total_absent || 0)
            const rate = total > 0 ? ((row.total_present / total) * 100).toFixed(1) : '0.0'
            const rateNum = parseFloat(rate)

            return (
              <tr key={row.employee_id} className="table-row-hover">
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
                    {row.employee_id}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-800">{row.full_name}</td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {row.department}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold text-emerald-600">{row.total_present || 0}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold text-red-500">{row.total_absent || 0}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 max-w-[80px] bg-slate-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${rateNum >= 75 ? 'bg-emerald-500' : rateNum >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{rate}%</span>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
