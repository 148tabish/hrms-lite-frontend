import { useState } from 'react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { useAttendance } from '../../hooks/useAttendance'

export default function AttendanceForm({ employees, onSuccess, onClose }) {
  const { createAttendance, loadingCreate } = useAttendance()
  const [form, setForm] = useState({
    employee_id: employees[0]?.id || '',
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'Present',
  })
  const [errors, setErrors] = useState({})

  const employeeOptions = employees.map((e) => ({
    value: e.id,
    label: `${e.employee_id} — ${e.full_name}`,
  }))

  const validate = () => {
    const e = {}
    if (!form.employee_id) e.employee_id = 'Please select an employee'
    if (!form.date) e.date = 'Date is required'
    return e
  }

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    try {
      await createAttendance(form)
      toast.success('Attendance marked')
      onSuccess?.()
      onClose?.()
    } catch (err) {
      if (typeof err === 'string' && (err.toLowerCase().includes('duplicate') || err.toLowerCase().includes('unique') || err.toLowerCase().includes('already'))) {
        toast.error('Attendance already marked for this employee on this date')
      } else {
        toast.error(err || 'Failed to mark attendance')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Employee"
        options={employeeOptions}
        value={form.employee_id}
        onChange={handleChange('employee_id')}
        error={errors.employee_id}
      />
      <Input
        label="Date"
        type="date"
        value={form.date}
        onChange={handleChange('date')}
        error={errors.date}
        max={format(new Date(), 'yyyy-MM-dd')}
      />
      <Select
        label="Status"
        options={[
          { value: 'Present', label: 'Present' },
          { value: 'Absent',  label: 'Absent' },
        ]}
        value={form.status}
        onChange={handleChange('status')}
      />
      <div className="flex gap-2 pt-2 justify-end">
        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
        <Button type="submit" loading={loadingCreate}>Mark Attendance</Button>
      </div>
    </form>
  )
}
