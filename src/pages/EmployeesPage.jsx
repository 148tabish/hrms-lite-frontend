import { useEffect, useState } from 'react'
import { UserPlus, Users, Search } from 'lucide-react'
import { useEmployees } from '../hooks/useEmployees'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import ErrorState from '../components/ui/ErrorState'
import EmployeeTable from '../components/employees/EmployeeTable'
import EmployeeForm from '../components/employees/EmployeeForm'
import EmployeeDeleteModal from '../components/employees/EmployeeDeleteModal'

export default function EmployeesPage() {
  const { employees, fetchEmployees, loadingList, errorList } = useEmployees()
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editEmployee, setEditEmployee] = useState(null)
  const [deleteEmployee, setDeleteEmployee] = useState(null)

  useEffect(() => { fetchEmployees(deptFilter) }, [deptFilter])

  const departments = [...new Set(employees.map((e) => e.department))].sort()

  const filtered = employees.filter(
    (e) =>
      e.full_name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.employee_id.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (emp) => { setEditEmployee(emp); setModalOpen(true) }
  const handleDelete = (emp) => setDeleteEmployee(emp)
  const handleCloseModal = () => { setModalOpen(false); setEditEmployee(null) }

  return (
    <div>
      <PageHeader
        title="Employees"
        subtitle={`${employees.length} total employee${employees.length !== 1 ? 's' : ''}`}
        action={
          <Button onClick={() => { setEditEmployee(null); setModalOpen(true) }}>
            <UserPlus size={15} /> Add Employee
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input-base pl-8"
            placeholder="Search name, email, ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input-base w-auto min-w-[160px]"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Content */}
      <div className="card">
        {loadingList ? (
          <div className="flex justify-center py-16"><Spinner size="lg" /></div>
        ) : errorList ? (
          <ErrorState message={errorList} onRetry={() => fetchEmployees(deptFilter)} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title={search ? 'No employees match your search' : 'No employees yet'}
            subtitle={search ? 'Try a different search term' : 'Add your first employee to get started'}
            action={!search && <Button onClick={() => setModalOpen(true)}><UserPlus size={14} /> Add Employee</Button>}
          />
        ) : (
          <EmployeeTable employees={filtered} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editEmployee ? 'Edit Employee' : 'Add New Employee'}
      >
        <EmployeeForm
          employee={editEmployee}
          onSuccess={() => fetchEmployees(deptFilter)}
          onClose={handleCloseModal}
        />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={Boolean(deleteEmployee)}
        onClose={() => setDeleteEmployee(null)}
        title="Delete Employee"
        size="sm"
      >
        <EmployeeDeleteModal
          employee={deleteEmployee}
          onSuccess={() => fetchEmployees(deptFilter)}
          onClose={() => setDeleteEmployee(null)}
        />
      </Modal>
    </div>
  )
}
