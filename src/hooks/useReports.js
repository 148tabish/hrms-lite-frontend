import useReportStore from '../stores/useReportStore'

export function useReports() {
  const store = useReportStore()
  return {
    summary:        store.summary,
    rangeReport:    store.rangeReport,
    loadingSummary: store.loading.summary,
    loadingRange:   store.loading.range,
    errorSummary:   store.error.summary,
    errorRange:     store.error.range,

    fetchAttendanceSummary:  store.fetchAttendanceSummary,
    fetchAttendanceByRange:  store.fetchAttendanceByRange,
    clearReports:            store.clearReports,
  }
}
