import { create } from 'zustand'
import axiosInstance from '../api/axiosInstance'

const useReportStore = create((set, get) => ({
  summary: [],
  rangeReport: [],
  loading: { summary: false, range: false },
  error:   { summary: null,  range: null  },

  _setLoading: (key, val) =>
    set((s) => ({ loading: { ...s.loading, [key]: val } })),
  _setError: (key, val) =>
    set((s) => ({ error: { ...s.error, [key]: val } })),

  clearReports: () => set({ summary: [], rangeReport: [] }),

  fetchAttendanceSummary: async (department = '') => {
    get()._setLoading('summary', true)
    get()._setError('summary', null)
    try {
      const params = department ? { department } : {}
      const res = await axiosInstance.get('/api/reports/attendance-summary', { params })
      set({ summary: res.data.data || [] })
    } catch (err) {
      get()._setError('summary', err)
    } finally {
      get()._setLoading('summary', false)
    }
  },

  fetchAttendanceByRange: async (params) => {
    get()._setLoading('range', true)
    get()._setError('range', null)
    try {
      const clean = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== '' && v !== null && v !== undefined)
      )
      const res = await axiosInstance.get('/api/reports/attendance-by-range', { params: clean })
      set({ rangeReport: res.data.data || [] })
    } catch (err) {
      get()._setError('range', err)
    } finally {
      get()._setLoading('range', false)
    }
  },
}))

export default useReportStore
