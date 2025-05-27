<script setup>
import { ref, watch, onMounted } from 'vue'
import { useSweetAlert } from '@/composables/useSweetAlert'
import { useRouter, useRoute } from 'vue-router'
import api from '@/api'

const { showSuccess, showError } = useSweetAlert()
const router = useRouter()

const route = useRoute()
const orderId = route.params.id
const order = ref(null)
const form = ref({})

onMounted(async () => {
    try {
        const response = await api.get(`/orders/${orderId}`)
        order.value = response.data
        form.value = order.value.data
    } catch (error) {
        showError('Gagal ambil data order', 'Silakan coba lagi nanti')
    }
})

const addItem = () => {
    form.value.items.push({
        product_name: '',
        price: 0,
        qty: 1,
        subtotal: 0
    })
}

const removeItem = (index) => {
    form.value.items.splice(index, 1)
}

watch(() => form.value.items, (newItems) => {
    newItems.forEach(item => {
        item.subtotal = item.price * item.qty
    })
    form.value.grand_total = form.value.items.reduce((total, item) => total + item.subtotal, 0)
}, { deep: true })

const loading = ref(false)
const updateOrder = async () => {
    loading.value = true
    try {
        const response = await api.put(`/orders/${orderId}`, form.value)
        showSuccess('Order updated successfully')
        router.push({ name: 'home' }) // Redirect to Home after creation
    } catch (error) {
        console.error('Failed to create order:', error)
        showError('Error', 'Failed to create order')
    }
}
</script>

<template>
    <div class="create-view">
        <h1 class="font-semibold text-2xl">Edit Order</h1>
        <div class="divider"></div>
        <div class="flex justify-end space-x-2">
            <router-link to="/" class="btn btn-primary">Kembali</router-link>
        </div>
        <form @submit.prevent="updateOrder">
            <div class="mb-4">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend text-black">Nama Customer</legend>
                    <input type="text" v-model="form.customer_name" class="input w-1/2 bg-gray-100"
                        placeholder="Type here" />
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend text-black">Tanggal Order</legend>
                    <input type="date" v-model="form.order_date" class="input w-1/2 bg-gray-100"
                        placeholder="Type here" />
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend text-black">Grand Total</legend>
                    <input type="text" v-model="form.grand_total" class="input w-1/2 bg-gray-100"
                        placeholder="Type here" />
                </fieldset>
            </div>
            <table class="table">
                <!-- head -->
                <thead>
                    <tr class="text-black">
                        <th>Produk</th>
                        <th>Harga</th>
                        <th>qty</th>
                        <th>Subtotal</th>
                        <th>
                            <button type="button" @click="addItem" class="btn btn-success">Tambah</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in form.items" :key="index">
                        <td>
                            <input type="text" v-model="item.product_name" class="input w-full bg-gray-100"
                                placeholder="Nama Produk" />
                        </td>
                        <td>
                            <input type="number" step=".01" v-model="item.price" class="input w-full bg-gray-100"
                                placeholder="Harga" />
                        </td>
                        <td>
                            <input type="number" step=".01" v-model="item.qty" class="input w-full bg-gray-100"
                                placeholder="qty" />
                        </td>
                        <td>
                            <input type="number" step=".01" v-model="item.subtotal" class="input w-full bg-gray-100"
                                placeholder="Subtotal" readonly />
                        </td>
                        <td>
                            <button type="button" @click="removeItem(index)" class="btn btn-error">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="divider"></div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
</template>