import useEmployeeStore from '../stores/useEmployeeStore'

export function useEmployees() {
  const store = useEmployeeStore()
  return {
    employees:     store.employees,
    selected:      store.selected,
    loadingList:   store.loading.list,
    loadingCreate: store.loading.create,
    loadingUpdate: store.loading.update,
    loadingDelete: store.loading.delete,
    loadingSingle: store.loading.single,
    errorList:     store.error.list,
    errorCreate:   store.error.create,
    errorUpdate:   store.error.update,
    errorDelete:   store.error.delete,

    fetchEmployees:  store.fetchEmployees,
    fetchEmployee:   store.fetchEmployee,
    createEmployee:  store.createEmployee,
    updateEmployee:  store.updateEmployee,
    deleteEmployee:  store.deleteEmployee,
    clearSelected:   store.clearSelected,
    clearError:      store.clearError,
  }
}
