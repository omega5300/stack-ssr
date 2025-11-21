<script setup lang="ts">
defineProps<{
  type: string
}>() 
</script>

<template>
  <li :class="type">{{ type }}</li>
</template>