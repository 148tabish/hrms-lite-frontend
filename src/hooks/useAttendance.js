import useAttendanceStore from '../stores/useAttendanceStore'

export function useAttendance() {
  const store = useAttendanceStore()
  return {
    records:       store.records,
    selected:      store.selected,
    loadingList:   store.loading.list,
    loadingCreate: store.loading.create,
    loadingUpdate: store.loading.update,
    loadingDelete: store.loading.delete,
    errorList:     store.error.list,
    errorCreate:   store.error.create,
    errorUpdate:   store.error.update,

    fetchAttendance:        store.fetchAttendance,
    fetchAttendanceById:    store.fetchAttendanceById,
    createAttendance:       store.createAttendance,
    updateAttendanceStatus: store.updateAttendanceStatus,
    deleteAttendance:       store.deleteAttendance,
    clearSelected:          store.clearSelected,
    clearError:             store.clearError,
  }
}
