<script setup lang="ts">
import type { PotterCharacter } from '#shared/interfaces/potterInterdface';

useHead({
  title: 'potter search',
  meta: [
    { name: 'description', content: 'search harry potter characters' },
    { name: 'keywords', content: 'stack-analyze, stack query tools, stack potter search' }
  ]
})

const query = ref('')
const potterCharacters = ref<PotterCharacter[]>([]);

const isEmptyResults = computed(
  () => potterCharacters.value.length === 0
);

const getCharacters = async () => {
  if(!query.value) return alertMsg('this field is required', 'alert-warn')

  try {
    const potterSchema = await $fetch<PotterCharacter[]>('https://potterapi-fedeperin.vercel.app/en/characters', {
      params: { search: query.value }
    })

    potterCharacters.value = potterSchema
  } catch (err) { alertMsg((err as Error).message, 'alert-danger') }
  query.value = ''
}

const clearSearch = () => {
  potterCharacters.value = [];
}
</script>

<template>
  <nuxt-layout name="query">
    <h1>potter search</h1>

    <stack-input 
      v-model="query"
      msg="enter a keyword for search"
      :disabled-init="false" 
      :disabled-clear="isEmptyResults" 
      @init-function="getCharacters" 
      @clear-function="clearSearch"
    />

    <ul class="glass list">
      <potter-character 
        v-for="item of potterCharacters" :character="item" 
      />
    </ul>
  </nuxt-layout>
</template>