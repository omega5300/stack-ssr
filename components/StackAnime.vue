<script setup lang="ts">
import { Anime } from '~~/utils/interfaces/animeInterface'

const { animeData } = defineProps<{
  animeData: Anime
}>()

const totalEpisodes = computed(
  () => !animeData.episodes 
    ? 'current' 
    : `${animeData.episodes} episodes`
)
</script>

<template>
  <li class="list-item">
    <section class="list-item__content">
      <figure class="list-item__figure">
        <img class="list-item__poster" :src="animeData.images?.webp?.image_url" :alt="animeData.title" />
      </figure>
      <p class="list-item__header">
        <strong class="list-item__title">
          {{ animeData.title }} - {{ totalEpisodes }}
        </strong>
        <em class="list-item__subtitle">
          {{ animeData.aired?.string }}
        </em>
      </p>
      <p class="list-item__details">
        {{ animeData.score || '?' }} / 10
      </p>
    </section>
  </li>
</template>