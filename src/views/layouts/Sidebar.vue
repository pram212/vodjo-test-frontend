<script setup>

</script>

<template>
    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-black opacity-65 text-base-content min-h-full w-72 p-4 space-y-3">
        <!-- Sidebar content here -->
        <li>
            <router-link to="/">Home</router-link>
        </li>
        <li>
            <router-link to="/create">Buat Order</router-link>
        </li>
    </ul>
</template>