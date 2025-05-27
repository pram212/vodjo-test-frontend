<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref, watch } from 'vue'
import { useExportStore } from '@/stores/export'
import { useSweetAlert } from '@/composables/useSweetAlert'
import api from '@/api'

const exportStore = useExportStore()
const { showSuccess, showError, confirmDelete } = useSweetAlert()
const exporting = ref(false)

const auth = useAuthStore()
const orders = ref(null)
const loading = ref(true)

const filter = ref({ order_no: '', start: '', end: '' })

const exportData = async () => {
  exportStore.startExport()
  await api.post('/orders-export')
}

watch(() => exportStore.filename, (filename) => {
  if (filename) {
    showSuccess('Export selesai!')
    window.open(`http://localhost:8000/storage/${filename}`, '_blank') // buka file
    exportStore.reset()
  }
})

const handleFilter = async (e) => {
  fetchOrders('/orders', filter.value)

}

const deleteOrder = async (orderId) => {
  loading.value = true
  const confirmed = await confirmDelete('Yakin ingin menghapus data ini?')
  if (confirmed) {
    try {
      await api.delete(`/orders/${orderId}`)
      showSuccess('Terhapus!', 'Data berhasil dihapus.')
      await fetchOrders()
      loading.value = false
    } catch (err) {
      showError('Oops!', 'Terjadi kesalahan saat menghapus.')
      loading.value = false
    }
  }
}

const fetchOrders = async (url = '/orders', params = {}) => {
  loading.value = true
  try {
    const response = await api.get(url, {
      params: {
        ...params,
      }
    })
    orders.value = response.data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.error('Gagal ambil data orders', error)
  }
}

const handlePagination = async (url) => {
  if (!url) return
  await fetchOrders(url, filter.value)
}

onMounted(async () => {
  fetchOrders()
})

</script>

<template>
  <main class="px-3 py-3">
    <div>
      <h1 class="font-semibold text-2xl">List Order</h1>
      <div class="divider"></div>
      <div class="flex justify-end space-x-2">
        <router-link to="/create" class="btn btn-primary">Order Baru</router-link>
        <button type="button" @click="exportData" class="btn btn-success text-black" :disabled="exportStore.exporting">
          {{ exportStore.exporting ? 'Sedang Mengexport...' : 'Export Data' }}
        </button>
      </div>
      <form @submit.prevent="handleFilter" class="my-4 p-3 rounded-sm bg-gray-100">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <fieldset class="fieldset">
            <legend class="fieldset-legend text-black">No. Order</legend>
            <input type="text" v-model="filter.order_no" class="input w-full bg-gray-300" placeholder="Type here" />
          </fieldset>
          <fieldset class="fieldset">
            <legend class="fieldset-legend text-black ">Dari Tanggal</legend>
            <input type="date" v-model="filter.start" class="input w-full bg-gray-300" placeholder="Type here" />
          </fieldset>
          <fieldset class="fieldset">
            <legend class="fieldset-legend text-black">Sampai tanggal</legend>
            <input type="date" v-model="filter.end" class="input w-full bg-gray-300" placeholder="Type here" />
          </fieldset>
          <button type="submit" class="btn btn-primary w-1/2">Filter</button>
        </div>
      </form>
    </div>

    <div v-if="loading" class="relative inset-5 z-50 flex items-start justify-center bg-transparent bg-opacity-100">
      <span class="loading loading-spinner loading-lg text-gray-800"></span>
    </div>

    <div v-if="orders" class="overflow-x-auto rounded-box border border-gray-50 w-full">

      <table class="table bg-gray-100">
        <!-- head -->
        <thead>
          <tr class="text-black">
            <th>No. Order</th>
            <th>Nama Customer</th>
            <th>Tanggal</th>
            <th>Total Harga</th>
            <th class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="(item, index) in orders.data" :key="index">
            <td>{{ item.order_no }}</td>
            <td>{{ item.customer_name }}</td>
            <td>{{ item.order_date }}</td>
            <td>{{ item.grand_total }}</td>
            <td class="text-center">
              <div class="join">
                <router-link :to="`/detail/${item.id}`" class="btn btn-sm btn-primary join-item">Detail</router-link>
                <router-link :to="`/edit/${item.id}`" class="btn btn-sm btn-secondary join-item">Edit</router-link>
                <button type="button" class="btn btn-sm btn-error join-item"
                  @click="deleteOrder(item.id)">Hapus</button>
              </div>
            </td>
          </tr>
          <!-- row 2 -->
        </tbody>
        <tfoot>
          <tr>
            <td class="text-black">
              <div v-if="loading" class="text-center">Loading...</div>
              <div v-else-if="!orders.data.length" class="text-center">Tidak ada data order</div>
              <div v-else class="text-left">Total Orders: {{ orders.meta.total }}</div>
            </td>
            <td colspan="5" class="text-right">
              <div class="join" v-if="orders">
                <button class="join-item btn" :class="{ 'btn-active': item.active }"
                  v-for="(item, index) in orders.meta.links" :key="index" @click="handlePagination(item.url)">
                  <span v-html="item.label"></span>
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </main>
</template>
