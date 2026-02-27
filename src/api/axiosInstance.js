import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://hrms-lite-backend-d0jv.onrender.com',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// Response interceptor — unwrap envelope or throw error string
axiosInstance.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data && data.success === false) {
      return Promise.reject(data.error || 'An error occurred')
    }
    return response
  },
  (error) => {
    if (error.response) {
      const msg =
        error.response.data?.error ||
        error.response.data?.detail ||
        `Server error (${error.response.status})`
      return Promise.reject(msg)
    }
    if (error.code === 'ECONNABORTED') {
      return Promise.reject('Request timed out. Is the backend running?')
    }
    return Promise.reject('Network error. Is the backend running?')
  }
)

export default axiosInstance
