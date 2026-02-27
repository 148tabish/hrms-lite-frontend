import { useEffect } from 'react'
import { format } from 'date-fns'
import { Users, Building2, UserCheck, UserX } from 'lucide-react'
import { useEmployees } from '../hooks/useEmployees'
import { useAttendance } from '../hooks/useAttendance'
import { useReports } from '../hooks/useReports'
import Spinner from '../components/ui/Spinner'
import ErrorState from '../components/ui/ErrorState'
import SummaryTable from '../components/reports/SummaryTable'
import EmptyState from '../components/ui/EmptyState'
import { BarChart2 } from 'lucide-react'

function StatCard({ icon: Icon, label, value, color, loading }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        {loading ? (
          <div className="h-6 w-12 bg-slate-100 rounded animate-pulse mt-1" />
        ) : (
          <p className="text-2xl font-bold text-slate-800 leading-none mt-0.5">{value}</p>
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { employees, fetchEmployees, loadingList, errorList } = useEmployees()
  const { records, fetchAttendance, loadingList: loadingAtt } = useAttendance()
  const { summary, fetchAttendanceSummary, loadingSummary } = useReports()

  const today = format(new Date(), 'yyyy-MM-dd')

  useEffect(() => {
    fetchEmployees()
    fetchAttendance({ date: today })
    fetchAttendanceSummary()
  }, [])

  const departments = [...new Set(employees.map((e) => e.department))].length
  const todayPresent = records.filter((r) => r.status === 'Present').length
  const todayAbsent  = records.filter((r) => r.status === 'Absent').length

  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

  if (errorList) return <ErrorState message={errorList} onRetry={fetchEmployees} />

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}     label="Total Employees"   value={employees.length} color="bg-brand-600"  loading={loadingList} />
        <StatCard icon={Building2} label="Departments"        value={departments}      color="bg-violet-500" loading={loadingList} />
        <StatCard icon={UserCheck} label="Present Today"      value={todayPresent}     color="bg-emerald-500" loading={loadingAtt} />
        <StatCard icon={UserX}     label="Absent Today"       value={todayAbsent}      color="bg-red-400"    loading={loadingAtt} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Employees */}
        <div className="card">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700">Recently Added</h3>
            <p className="text-xs text-slate-400 mt-0.5">Last 5 employees</p>
          </div>
          <div className="divide-y divide-slate-50">
            {loadingList ? (
              <div className="flex justify-center py-8"><Spinner /></div>
            ) : recentEmployees.length === 0 ? (
              <EmptyState icon={Users} title="No employees yet" subtitle="Add your first employee to get started" />
            ) : (
              recentEmployees.map((emp) => (
                <div key={emp.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{emp.full_name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{emp.full_name}</p>
                    <p className="text-xs text-slate-400 truncate">{emp.department}</p>
                  </div>
                  <span className="font-mono text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded flex-shrink-0">
                    {emp.employee_id}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Today's Attendance Summary */}
        <div className="card">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700">Today's Attendance</h3>
            <p className="text-xs text-slate-400 mt-0.5">{format(new Date(), 'EEEE, MMMM d')}</p>
          </div>
          {loadingAtt ? (
            <div className="flex justify-center py-8"><Spinner /></div>
          ) : records.length === 0 ? (
            <EmptyState icon={UserCheck} title="No attendance today" subtitle="No records have been marked yet for today" />
          ) : (
            <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
              {records.map((r) => {
                const emp = employees.find((e) => e.id === r.employee_id)
                return (
                  <div key={r.id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${r.status === 'Present' ? 'bg-emerald-500' : 'bg-red-400'}`} />
                    <span className="text-sm text-slate-700 flex-1 truncate">{emp?.full_name || '—'}</span>
                    <span className={`text-xs font-medium ${r.status === 'Present' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {r.status}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Summary Table */}
      <div className="card">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">Overall Attendance Summary</h3>
          <p className="text-xs text-slate-400 mt-0.5">All-time record per employee</p>
        </div>
        {loadingSummary ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : summary.length === 0 ? (
          <EmptyState icon={BarChart2} title="No data yet" />
        ) : (
          <SummaryTable data={summary} />
        )}
      </div>
    </div>
  )
}
