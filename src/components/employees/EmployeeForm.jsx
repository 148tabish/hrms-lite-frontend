import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useEmployees } from '../../hooks/useEmployees'

const EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/

const empty = { employee_id: '', full_name: '', email: '', department: '' }

export default function EmployeeForm({ employee, onSuccess, onClose }) {
  const { createEmployee, updateEmployee, loadingCreate, loadingUpdate } = useEmployees()
  const isEdit = Boolean(employee)
  const [form, setForm] = useState(isEdit ? { ...employee } : empty)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (employee) setForm({ ...employee })
  }, [employee])

  const validate = () => {
    const e = {}
    if (!isEdit && !form.employee_id.trim()) e.employee_id = 'Employee ID is required'
    else if (!isEdit && form.employee_id.length > 20) e.employee_id = 'Max 20 characters'
    if (!form.full_name.trim()) e.full_name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!EMAIL_RE.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.department.trim()) e.department = 'Department is required'
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
      if (isEdit) {
        const payload = { full_name: form.full_name, email: form.email, department: form.department }
        await updateEmployee(employee.id, payload)
        toast.success('Employee updated')
      } else {
        await createEmployee(form)
        toast.success('Employee added')
      }
      onSuccess?.()
      onClose?.()
    } catch (err) {
      if (typeof err === 'string' && (err.toLowerCase().includes('duplicate') || err.toLowerCase().includes('unique') || err.toLowerCase().includes('already'))) {
        toast.error('Employee ID or email already exists')
      } else {
        toast.error(err || 'Something went wrong')
      }
    }
  }

  const loading = isEdit ? loadingUpdate : loadingCreate

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isEdit && (
        <Input
          label="Employee ID"
          placeholder="e.g. EMP-001"
          value={form.employee_id}
          onChange={handleChange('employee_id')}
          error={errors.employee_id}
          maxLength={20}
        />
      )}
      <Input
        label="Full Name"
        placeholder="John Doe"
        value={form.full_name}
        onChange={handleChange('full_name')}
        error={errors.full_name}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="john@company.com"
        value={form.email}
        onChange={handleChange('email')}
        error={errors.email}
      />
      <Input
        label="Department"
        placeholder="e.g. Engineering"
        value={form.department}
        onChange={handleChange('department')}
        error={errors.department}
      />
      <div className="flex gap-2 pt-2 justify-end">
        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
        <Button type="submit" loading={loading}>
          {isEdit ? 'Save Changes' : 'Add Employee'}
        </Button>
      </div>
    </form>
  )
}
