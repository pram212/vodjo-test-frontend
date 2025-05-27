<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const auth = useAuthStore()
const router = useRouter()
const logout = async () => {
    await auth.logout()
    router.push('/login')
}
</script>

<template>
    <div class="navbar shadow-lg bg-gray-50 px-5">
        <div class="flex-1">
            <label for="my-drawer-2" class="btn btn-ghost mr-2 drawer-button lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </label>
            <h1 class="text-black font-semibold text-xl">Vodjo Technical Test</h1>
        </div>
        <div class="flex-none">
            <button type="button" @click.prevent="logout" class="btn btn-error">Logout</button>
        </div>
    </div>
</template>