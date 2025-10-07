<script setup lang="ts">
const currentDate = new Date()
const pastDate = new Date(2020, 5, 1)
</script>

<template>
  <footer class="footer glass print:hidden">
    <p>
      &copy; stack-analyze {{ pastDate.getFullYear() }} - {{ currentDate.getFullYear() }}
    </p>
  </footer>
</template>