<script setup lang="ts">
import type { Deezer, DeezerAlbum } from '~/utils/interfaces/deezerInteface';

useHead({
  title: 'deezer search',
  meta: [
    { name: 'description', content: 'webscraping tool only in static webs not allow webs written with js' },
    { name: 'keywords', content: 'stack deezer search, deezer search, stack-analyze' }
  ],
})

// states
const albums = ref<DeezerAlbum[]>([])
const search = ref('')
const deezerError = ref('')

// computers
const isEmptyAlbums = computed(() => albums.value.length === 0)

// methods
const deezerSerach = async () => {
  if(!search.value) {
    alertMsg('this field is required', 'alert-warn')
    return
  }
  
  const {data, error} = await useFetch<Deezer, Error>('/api/deezer', {
    query: { search: search.value }
  })

  albums.value = data.value?.data || []
  deezerError.value = error.value?.message || ''
  search.value = ''
}

const clearAlbums = () => {
  albums.value = []
}
</script>

<template>
  <nuxt-layout name="query">
    <stack-input 
      v-model="search" 
      :disabled-init="false" 
      msg="enter a keyword for search album"
      :disabled-clear="isEmptyAlbums" 
      @init-function="deezerSerach" 
      @clear-function="clearAlbums" 
    />
    <section class="result">
      <deezer-card 
        v-for="album in albums" 
        v-if="!deezerError" :album 
      />
      <p v-else>{{ deezerError }}</p>
    </section>
  </nuxt-layout>
</template>