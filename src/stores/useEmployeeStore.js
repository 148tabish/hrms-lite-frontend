import { create } from 'zustand'
import axiosInstance from '../api/axiosInstance'

const useEmployeeStore = create((set, get) => ({
  employees: [],
  selected: null,
  loading: { list: false, single: false, create: false, update: false, delete: false },
  error:   { list: null,  single: null,  create: null,  update: null,  delete: null  },

  _setLoading: (key, val) =>
    set((s) => ({ loading: { ...s.loading, [key]: val } })),
  _setError: (key, val) =>
    set((s) => ({ error: { ...s.error, [key]: val } })),

  clearSelected: () => set({ selected: null }),
  clearError: (key) => set((s) => ({ error: { ...s.error, [key]: null } })),

  fetchEmployees: async (department = '') => {
    get()._setLoading('list', true)
    get()._setError('list', null)
    try {
      const params = department ? { department } : {}
      const res = await axiosInstance.get('/api/employees', { params })
      set({ employees: res.data.data || [] })
    } catch (err) {
      get()._setError('list', err)
    } finally {
      get()._setLoading('list', false)
    }
  },

  fetchEmployee: async (id) => {
    get()._setLoading('single', true)
    get()._setError('single', null)
    try {
      const res = await axiosInstance.get(`/api/employees/${id}`)
      set({ selected: res.data.data })
    } catch (err) {
      get()._setError('single', err)
    } finally {
      get()._setLoading('single', false)
    }
  },

  createEmployee: async (payload) => {
    get()._setLoading('create', true)
    get()._setError('create', null)
    try {
      const res = await axiosInstance.post('/api/employees', payload)
      const created = res.data.data
      set((s) => ({ employees: [created, ...s.employees] }))
      return created
    } catch (err) {
      get()._setError('create', err)
      throw err
    } finally {
      get()._setLoading('create', false)
    }
  },

  updateEmployee: async (id, payload) => {
    get()._setLoading('update', true)
    get()._setError('update', null)
    try {
      const res = await axiosInstance.put(`/api/employees/${id}`, payload)
      const updated = res.data.data
      set((s) => ({
        employees: s.employees.map((e) => (e.id === id ? updated : e)),
        selected: null,
      }))
      return updated
    } catch (err) {
      get()._setError('update', err)
      throw err
    } finally {
      get()._setLoading('update', false)
    }
  },

  deleteEmployee: async (id) => {
    get()._setLoading('delete', true)
    get()._setError('delete', null)
    try {
      await axiosInstance.delete(`/api/employees/${id}`)
      set((s) => ({ employees: s.employees.filter((e) => e.id !== id), selected: null }))
    } catch (err) {
      get()._setError('delete', err)
      throw err
    } finally {
      get()._setLoading('delete', false)
    }
  },
}))

export default useEmployeeStore
