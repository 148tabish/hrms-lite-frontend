import { create } from 'zustand'
import axiosInstance from '../api/axiosInstance'

const useAttendanceStore = create((set, get) => ({
  records: [],
  selected: null,
  loading: { list: false, single: false, create: false, update: false, delete: false },
  error:   { list: null,  single: null,  create: null,  update: null,  delete: null  },

  _setLoading: (key, val) =>
    set((s) => ({ loading: { ...s.loading, [key]: val } })),
  _setError: (key, val) =>
    set((s) => ({ error: { ...s.error, [key]: val } })),

  clearSelected: () => set({ selected: null }),
  clearError: (key) => set((s) => ({ error: { ...s.error, [key]: null } })),

  fetchAttendance: async (filters = {}) => {
    get()._setLoading('list', true)
    get()._setError('list', null)
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== '' && v !== null && v !== undefined)
      )
      const res = await axiosInstance.get('/api/attendance', { params })
      set({ records: res.data.data || [] })
    } catch (err) {
      get()._setError('list', err)
    } finally {
      get()._setLoading('list', false)
    }
  },

  fetchAttendanceById: async (id) => {
    get()._setLoading('single', true)
    try {
      const res = await axiosInstance.get(`/api/attendance/${id}`)
      set({ selected: res.data.data })
    } catch (err) {
      get()._setError('single', err)
    } finally {
      get()._setLoading('single', false)
    }
  },

  createAttendance: async (payload) => {
    get()._setLoading('create', true)
    get()._setError('create', null)
    try {
      const res = await axiosInstance.post('/api/attendance', payload)
      const created = res.data.data
      set((s) => ({ records: [created, ...s.records] }))
      return created
    } catch (err) {
      get()._setError('create', err)
      throw err
    } finally {
      get()._setLoading('create', false)
    }
  },

  updateAttendanceStatus: async (id, status) => {
    get()._setLoading('update', true)
    get()._setError('update', null)
    try {
      const res = await axiosInstance.put(`/api/attendance/${id}`, { status })
      const updated = res.data.data
      set((s) => ({
        records: s.records.map((r) => (r.id === id ? updated : r)),
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

  deleteAttendance: async (id) => {
    get()._setLoading('delete', true)
    get()._setError('delete', null)
    try {
      await axiosInstance.delete(`/api/attendance/${id}`)
      set((s) => ({ records: s.records.filter((r) => r.id !== id), selected: null }))
    } catch (err) {
      get()._setError('delete', err)
      throw err
    } finally {
      get()._setLoading('delete', false)
    }
  },
}))

export default useAttendanceStore
