import toast from 'react-hot-toast'
import Button from '../ui/Button'
import { useEmployees } from '../../hooks/useEmployees'
import { AlertTriangle } from 'lucide-react'

export default function EmployeeDeleteModal({ employee, onSuccess, onClose }) {
  const { deleteEmployee, loadingDelete } = useEmployees()

  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.id)
      toast.success('Employee deleted')
      onSuccess?.()
      onClose?.()
    } catch (err) {
      toast.error(err || 'Failed to delete')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
          <AlertTriangle size={18} className="text-red-500" />
        </div>
        <div>
          <p className="text-sm text-slate-700">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-slate-900">{employee?.full_name}</span>?
          </p>
          <p className="text-xs text-slate-400 mt-1">
            This will also remove all their attendance records. This action cannot be undone.
          </p>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="danger" loading={loadingDelete} onClick={handleDelete}>
          Delete Employee
        </Button>
      </div>
    </div>
  )
}
