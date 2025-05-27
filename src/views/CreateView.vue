<script setup>
import { useSweetAlert } from '@/composables/useSweetAlert'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import api from '@/api'

const { showSuccess, showError } = useSweetAlert()

const auth = useAuthStore()
const router = useRouter()
const form = ref({
    order_no: '',
    order_date: '',
    customer_name: '',
    grand_total: 0,
    items: [
        {
            product_name: '',
            price: 0,
            qty: 1,
            subtotal: 0
        }]
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

watch(form.value.items, (newItems) => {
    newItems.forEach(item => {
        item.subtotal = item.price * item.qty
    })
    form.value.grand_total = form.value.items.reduce((total, item) => total + item.subtotal, 0)
}, { deep: true })

const loading = ref(false)
const saveOrder = async () => {
    loading.value = true
    try {
        await api.post('/orders', form.value)
        showSuccess('Order created successfully')
        router.push({ name: 'home' }) // Redirect to Home after creation
    } catch (error) {
        console.error('Failed to create order:', error)
        showError('Error', 'Failed to create order')
    }
}
</script>

<template>
    <div class="create-view">
        <h1 class="font-semibold text-2xl">Order Baru</h1>
        <div class="divider"></div>
        <div class="flex justify-end space-x-2">
            <router-link to="/" class="btn btn-primary">Kembali</router-link>
        </div>
        <form @submit.prevent="saveOrder">
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
                            <input type="number" v-model.number="item.price" class="input w-full bg-gray-100"
                                placeholder="Harga" />
                        </td>
                        <td>
                            <input type="number" v-model.number="item.qty" class="input w-full bg-gray-100"
                                placeholder="qty" />
                        </td>
                        <td>
                            <input type="number" v-model.number="item.subtotal" class="input w-full bg-gray-100"
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