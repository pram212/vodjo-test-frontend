<script setup>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
</script>

<template>
    <div class="drawer lg:drawer-open bg-white">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-start justify-start">
            <Navbar></Navbar>
            <!-- Page content here -->
            <div class="shadow-lg min-h-screen flex flex-col px-8 py-3 w-full">
                <div class="p-3 bg-white text-black">
                    <router-view />
                </div>
            </div>
        </div>
        <div class="drawer-side">
            <Sidebar />
        </div>
    </div>
</template>