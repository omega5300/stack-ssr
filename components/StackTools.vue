<script setup lang="ts">
import { Tools } from '~~/utils/interfaces/linkInterface';

const { pages } = defineProps<{
  pages: Tools[]
}>()
</script>

<template>
  <aside class="glass tabs">
    <ul class="tab-bar">
      <li v-for="page of pages" :key="page.path">
        <nuxt-link :to="page.path" :title="page.app" class="tab-link">
          <stack-fa :icon="page.icon" />
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>