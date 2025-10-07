<script setup lang="ts">
useHead({
  title: 'web tools',
  meta: [
    { name: 'description', content: 'changelog info of web tools' },
    { name: 'keywords', content: 'stack-analyze, stack-analyze web tools' }
  ]
})
</script>

<template>
  <nuxt-layout name="web">
    <h1 class="title">web tools</h1>

    <section class="tools">
      <article 
        class="glass card" 
        v-for="tool of webTools" 
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