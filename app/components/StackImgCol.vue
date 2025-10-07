<script setup lang="ts">
defineProps<{
  path: string;
  name: string
}>()
</script>

<template>
  <div class="p-1 mb-2">
    <img class="max-w-full" :src="path" :alt="name">
    <a class="btn btn-primary block" :href="path" :download="name">{{ name }}</a>
  </div>
</template>