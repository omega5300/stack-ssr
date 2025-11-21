<script setup lang="ts">
onMounted(() => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  }
})
</script>

<template>
  <stack-navbar />
  <nuxt-page />
  <stack-footer />
</template>
