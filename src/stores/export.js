import { defineStore } from 'pinia'

export const useExportStore = defineStore('export', {
  state: () => ({
    filename: null,
    exporting: false,
  }),
  actions: {
    startExport() {
      this.exporting = true
      this.filename = null
    },
    finishExport(filename) {
      this.exporting = false
      this.filename = filename
    },
    reset() {
      this.filename = null
      this.exporting = false
    },
  },
})
