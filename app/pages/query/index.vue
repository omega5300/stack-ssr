<script setup lang="ts">
useHead({
  title: 'query tools',
  meta: [
    { name: 'description', content: 'changelog & description of query tools' },
    { name: 'keywords', content: 'stack-analyze, stack query tools' }
  ]
})
</script>

<template>
  <nuxt-layout name="query">
    <h1 class="title">query tools</h1>

    <section class="tools">
      <article 
        class="glass card" 
        v-for="tool of queryTools" 
        :key="tool.name"
      >
        <h2 class="card-title">
          {{ tool.name }} {{ tool.versionAdded }}
        </h2>

        <p>{{ tool.description }}</p>
      </article>
    </section>
  </nuxt-layout>
</template>