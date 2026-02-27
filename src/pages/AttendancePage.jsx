import { useEffect, useState } from 'react'
import { CalendarPlus, CalendarCheck } from 'lucide-react'
import { useEmployees } from '../hooks/useEmployees'
import { useAttendance } from '../hooks/useAttendance'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import ErrorState from '../components/ui/ErrorState'
import AttendanceTable from '../components/attendance/AttendanceTable'
import AttendanceFilters from '../components/attendance/AttendanceFilters'
import AttendanceForm from '../components/attendance/AttendanceForm'

const defaultFilters = { employee_id: '', date: '', start_date: '', end_date: '', status: '' }

export default function AttendancePage() {
  const { employees, fetchEmployees } = useEmployees()
  const { records, fetchAttendance, loadingList, errorList } = useAttendance()
  const [filters, setFilters] = useState(defaultFilters)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => { fetchEmployees() }, [])
  useEffect(() => { fetchAttendance(filters) }, [filters])

  return (
    <div>
      <PageHeader
        title="Attendance"
        subtitle={`${records.length} record${records.length !== 1 ? 's' : ''} found`}
        action={
          <Button onClick={() => setModalOpen(true)} disabled={employees.length === 0}>
            <CalendarPlus size={15} /> Mark Attendance
          </Button>
        }
      />

      <AttendanceFilters employees={employees} filters={filters} onChange={setFilters} />

      <div className="card">
        {loadingList ? (
          <div className="flex justify-center py-16"><Spinner size="lg" /></div>
        ) : errorList ? (
          <ErrorState message={errorList} onRetry={() => fetchAttendance(filters)} />
        ) : records.length === 0 ? (
          <EmptyState
            icon={CalendarCheck}
            title="No attendance records"
            subtitle="Try adjusting your filters or mark attendance for today"
            action={<Button onClick={() => setModalOpen(true)}><CalendarPlus size={14} /> Mark Attendance</Button>}
          />
        ) : (
          <AttendanceTable records={records} employees={employees} />
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Mark Attendance">
        {employees.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">
            Add employees before marking attendance.
          </p>
        ) : (
          <AttendanceForm
            employees={employees}
            onSuccess={() => fetchAttendance(filters)}
            onClose={() => setModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  )
}
