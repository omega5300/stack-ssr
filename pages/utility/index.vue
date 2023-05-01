<script setup lang="ts">
useHead({
  title: 'utility tools',
  meta: [
    { name: 'description', content: 'changelog & description of utility tools' },
    { name: 'keywords', content: 'stack-analyze, stack utility tools' }
  ]
})
</script>

<template>
  <nuxt-layout name="utility">
    <h1 class="title">utility tools</h1>

    <section class="tools">
      <article 
        class="glass card" 
        v-for="tool of utilityTools" 
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