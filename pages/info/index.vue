<script setup lang="ts">
useHead({
  title: 'info tools',
  meta: [
    { name: 'description', content: 'changelog & description of info tools' },
    { name: 'keywords', content: 'stack-analyze, stack info tools' }
  ]
})
</script>

<template>
  <nuxt-layout name="info">
    <h1 class="title">info tools</h1>

    <section class="tools">
      <article 
        class="glass card" 
        v-for="tool of infoTools" 
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