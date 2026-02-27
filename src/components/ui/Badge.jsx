export default function Badge({ status }) {
  const styles = {
    Present: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    Absent:  'bg-red-50 text-red-600 ring-1 ring-red-200',
  }
  const dots = {
    Present: 'bg-emerald-500',
    Absent:  'bg-red-500',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || 'bg-slate-400'}`} />
      {status}
    </span>
  )
}
