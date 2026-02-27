import { useEffect, useState } from 'react'
import { BarChart2, Calendar } from 'lucide-react'
import { useEmployees } from '../hooks/useEmployees'
import { useReports } from '../hooks/useReports'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Select from '../components/ui/Select'
import Input from '../components/ui/Input'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import ErrorState from '../components/ui/ErrorState'
import SummaryTable from '../components/reports/SummaryTable'
import RangeReport from '../components/reports/RangeReport'

export default function ReportsPage() {
  const { employees, fetchEmployees } = useEmployees()
  const {
    summary, rangeReport,
    fetchAttendanceSummary, fetchAttendanceByRange,
    loadingSummary, loadingRange,
    errorSummary, errorRange,
  } = useReports()

  const [summaryDept, setSummaryDept] = useState('')
  const [rangeParams, setRangeParams] = useState({
    start_date: '', end_date: '', employee_id: '', department: ''
  })
  const [rangeError, setRangeError] = useState('')

  useEffect(() => { fetchEmployees(); fetchAttendanceSummary() }, [])
  useEffect(() => { fetchAttendanceSummary(summaryDept) }, [summaryDept])

  const departments = [...new Set(employees.map((e) => e.department))].sort()
  const deptOptions = [{ value: '', label: 'All Departments' }, ...departments.map((d) => ({ value: d, label: d }))]
  const empOptions  = [{ value: '', label: 'All Employees' }, ...employees.map((e) => ({ value: e.id, label: `${e.employee_id} — ${e.full_name}` }))]

  const handleGenerateRange = () => {
    if (!rangeParams.start_date || !rangeParams.end_date) {
      setRangeError('Please select both start and end dates')
      return
    }
    if (rangeParams.start_date > rangeParams.end_date) {
      setRangeError('Start date must be before end date')
      return
    }
    setRangeError('')
    fetchAttendanceByRange(rangeParams)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" subtitle="Attendance insights and analytics" />

      {/* Section A: Summary */}
      <div className="card">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Attendance Summary</h3>
            <p className="text-xs text-slate-400 mt-0.5">Total present & absent days per employee</p>
          </div>
          <div className="w-48">
            <Select
              options={deptOptions}
              value={summaryDept}
              onChange={(e) => setSummaryDept(e.target.value)}
            />
          </div>
        </div>

        {loadingSummary ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : errorSummary ? (
          <ErrorState message={errorSummary} onRetry={() => fetchAttendanceSummary(summaryDept)} />
        ) : summary.length === 0 ? (
          <EmptyState icon={BarChart2} title="No data available" subtitle="Attendance records will appear here once created" />
        ) : (
          <SummaryTable data={summary} />
        )}
      </div>

      {/* Section B: Date Range */}
      <div className="card">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">Attendance by Date Range</h3>
          <p className="text-xs text-slate-400 mt-0.5">Filter attendance records across a custom date range</p>
        </div>

        <div className="px-5 py-4 border-b border-slate-100">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="min-w-[160px]">
              <Input
                label="Start Date"
                type="date"
                value={rangeParams.start_date}
                onChange={(e) => setRangeParams((p) => ({ ...p, start_date: e.target.value }))}
              />
            </div>
            <div className="min-w-[160px]">
              <Input
                label="End Date"
                type="date"
                value={rangeParams.end_date}
                onChange={(e) => setRangeParams((p) => ({ ...p, end_date: e.target.value }))}
              />
            </div>
            <div className="min-w-[200px]">
              <Select
                label="Employee"
                options={empOptions}
                value={rangeParams.employee_id}
                onChange={(e) => setRangeParams((p) => ({ ...p, employee_id: e.target.value }))}
              />
            </div>
            <div className="min-w-[160px]">
              <Select
                label="Department"
                options={deptOptions}
                value={rangeParams.department}
                onChange={(e) => setRangeParams((p) => ({ ...p, department: e.target.value }))}
              />
            </div>
            <Button onClick={handleGenerateRange} loading={loadingRange}>
              <Calendar size={14} /> Generate Report
            </Button>
          </div>
          {rangeError && <p className="text-xs text-red-500 mt-2">{rangeError}</p>}
        </div>

        {loadingRange ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : errorRange ? (
          <ErrorState message={errorRange} onRetry={handleGenerateRange} />
        ) : rangeReport.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No results"
            subtitle={rangeParams.start_date ? 'No records found for the selected range' : 'Select a date range and click Generate Report'}
          />
        ) : (
          <RangeReport data={rangeReport} />
        )}
      </div>
    </div>
  )
}
