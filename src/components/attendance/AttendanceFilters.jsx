import Input from '../ui/Input'
import Select from '../ui/Select'

export default function AttendanceFilters({ employees, filters, onChange }) {
  const employeeOptions = [
    { value: '', label: 'All Employees' },
    ...employees.map((e) => ({ value: e.id, label: `${e.employee_id} — ${e.full_name}` })),
  ]

  const statusOptions = [
    { value: '',        label: 'All Statuses' },
    { value: 'Present', label: 'Present' },
    { value: 'Absent',  label: 'Absent' },
  ]

  return (
    <div className="flex flex-wrap gap-3 mb-5">
      <div className="min-w-[200px]">
        <Select
          options={employeeOptions}
          value={filters.employee_id}
          onChange={(e) => onChange({ ...filters, employee_id: e.target.value })}
        />
      </div>
      <div>
        <Input
          type="date"
          value={filters.date}
          onChange={(e) => onChange({ ...filters, date: e.target.value, start_date: '', end_date: '' })}
        />
      </div>
      <div>
        <Input
          type="date"
          placeholder="Start date"
          value={filters.start_date}
          onChange={(e) => onChange({ ...filters, start_date: e.target.value, date: '' })}
        />
      </div>
      <div>
        <Input
          type="date"
          placeholder="End date"
          value={filters.end_date}
          onChange={(e) => onChange({ ...filters, end_date: e.target.value, date: '' })}
        />
      </div>
      <div className="min-w-[140px]">
        <Select
          options={statusOptions}
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
        />
      </div>
      <button
        className="text-xs text-slate-400 hover:text-slate-600 underline self-end pb-2"
        onClick={() => onChange({ employee_id: '', date: '', start_date: '', end_date: '', status: '' })}
      >
        Clear filters
      </button>
    </div>
  )
}
