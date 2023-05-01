<script setup>
const props = defineProps({
  error: Object
})

const error = useError()

useHead({
  title: `error ${error.value.statusCode}`,
  link: [
    {rel: 'stylesheet', href: '/css/error.css' }
  ],
})
</script>

<template>
  <!-- Error Page -->
  <div class="main">
    <div class="fof">
      <h1>Error {{ error.statusCode }}</h1>
      <p>{{ error.message }}</p>
    </div>
    
  </div>
  <!-- Error Page -->
</template>
