import Swal from 'sweetalert2'

export function useSweetAlert() {
  const showSuccess = (title = 'Berhasil!', text = '') => {
    Swal.fire({
      icon: 'success',
      title,
      text,
    })
  }

  const showError = (title = 'Gagal!', text = '') => {
    Swal.fire({
      icon: 'error',
      title,
      text,
    })
  }

  const confirmDelete = async (text = 'Data akan dihapus!') => {
    const result = await Swal.fire({
      title: 'Yakin?',
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    })
    return result.isConfirmed
  }

  return {
    showSuccess,
    showError,
    confirmDelete,
  }
}
