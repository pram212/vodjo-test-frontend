<template>
    <div class="p-4 min-w-md mx-auto space-y-2 bg-gray-500 rounded-sm shadow-lg ">
        <h2 class="text-center text-2xl">Login</h2>
        <div class="divider"></div>
        <form @submit.prevent="handleLogin">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Email</legend>
                <input type="email" v-model="email" class="input w-full" placeholder="Type here" />
                <!-- <p class="label">required</p> -->
            </fieldset>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Password</legend>
                <input type="password" v-model="password" class="input w-full" placeholder="Type here" />
                <!-- <p class="label">required</p> -->
            </fieldset>
            <div class="divider"></div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
    try {
        await auth.login({ email: email.value, password: password.value })
        router.push('/') // redirect setelah login
    } catch (error) {
        alert('Login gagal: ' + error.response?.data?.message || 'Server error')
    }
}
</script>
