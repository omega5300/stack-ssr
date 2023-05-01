<script setup lang="ts">
import { Anime, AnimePagination } from '~~/utils/interfaces/animeInterface'

useHead({
  title: 'anime search',
  meta: [
    { name: 'description', content: 'tool for query anime, ova and others' },
    { name: 'keywords', content: 'stack-analyze, anime search, stack-analyze anime' }
  ],
  script: [
    { src: '/js/alert.js', body: true }
  ]
})

const anime = ref('')

const animeList = ref<Anime[]>([])

const isEmptyAnimeData = computed(() => animeList.value.length === 0)

const animeSearch = async () => {
  if(!anime.value) return alertMsg('this field is required', 'alert-warn')
  
  try {
    const animeSchema: AnimePagination = await $fetch('https://api.jikan.moe/v4/anime', {
      params: { q: anime.value }
    })
    animeList.value = animeSchema.data
  } catch(err) {
    alertMsg((err as Error).message, 'alert-danger')
  }
  
  anime.value = ''
}
const clearAnime = () => {
  animeList.value = []
};

</script>

<template>
  <nuxt-layout name="query">
    <h1>anime search</h1>
    <stack-input 
      v-model="anime" 
      msg="enter a anime for search"
      :disabled-init="false" 
      :disabled-clear="isEmptyAnimeData" 
      @init-function="animeSearch" 
      @clear-function="clearAnime"
    />
    <ul class="glass list">
      <stack-anime v-for="animeItem of animeList" :key="animeItem.mal_id" :anime-data="animeItem" />
    </ul>
  </nuxt-layout>
</template>