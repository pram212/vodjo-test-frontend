<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useExportStore } from '@/stores/export';
import GuestLayout from './views/layouts/GuestLayout.vue';
import echo from '@/echo'

const route = useRoute();

// Jika tidak ada meta layout, gunakan GuestLayout
const layout = computed(() => route.meta.layout || GuestLayout);
// event listener untuk broadcasting
onMounted(() => {
  const exportStore = useExportStore()
  echo.channel('export-channel')
    .listen('.export-finished', (e) => {
      exportStore.finishExport(e.filename)
    })
});

</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>