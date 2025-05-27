<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import api from '@/api'

const auth = useAuthStore()
const route = useRoute()
const orderId = route.params.id
const order = ref(null)

onMounted(async () => {
    try {
        const response = await api.get(`/orders/${orderId}`)
        order.value = response.data

    } catch (error) {
        console.error('Gagal ambil data orders', error)
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <div class="create-view">
        <h1 class="font-semibold text-2xl">Detail Order</h1>
        <div class="divider divider-primary"></div>
        <div class="flex justify-end">
            <router-link to="/" class="btn btn-primary">Kembali</router-link>
        </div>
        <form v-if="order">
            <div class="mb-4 grid grid-cols-2 gap-4">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend text-black">Nama Customer</legend>
                    <input type="text" v-model="order.data.customer_name" class="input w-full bg-gray-100" readonly />
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend text-black">Tanggal Order</legend>
                    <input type="date" v-model="order.data.order_date" class="input w-full bg-gray-100" readonly />
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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in order.data.items" :key="index">
                        <td>
                            <input type="text" v-model="item.product_name" class="input w-full bg-gray-100" readonly />
                        </td>
                        <td>
                            <input type="number" step=".01" v-model.number="item.price" class="input w-full bg-gray-100"
                                readonly />
                        </td>
                        <td>
                            <input type="number" step=".01" v-model.number="item.qty" class="input w-full bg-gray-100"
                                readonly />
                        </td>
                        <td>
                            <input type="number" step=".01" v-model="item.subtotal" class="input w-full bg-gray-100"
                                readonly />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" class="text-black font-semibold">Grand total :</td>
                        <td class="text-black font-semibold">Rp {{ order.data.grand_total }}</td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>