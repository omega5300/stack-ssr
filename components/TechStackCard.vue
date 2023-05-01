<script setup lang="ts">
import { TechStack } from '~~/utils/interfaces/stackInterface'

const { stackData } = defineProps<{
  stackData: TechStack
}>()

const formatter = new Intl.ListFormat('en', {
  style: 'short',
  type: 'unit'
})
</script>

<template>
  <article class="glass card">
    <figure class="card-header">
      <img 
        :src="`https://stack-analyze.web.app/logos/${stackData.icon}`" 
        :alt="stackData.name"
        class="card-image"
      >
      <figcaption class="card-title">{{ stackData.name }}</figcaption>
    </figure>
    <p class="card-body">
      categories: <br/> 
      {{ formatter.format(stackData.techCategories) }}
    </p>
    <section class="card-btns">
      <a 
        class="btn btn-primary"  
        :href="stackData.website" 
        target="_blank" 
        rel="nofollow"
      >
        {{ stackData.name }} website
      </a>
    </section>
  </article>
</template>