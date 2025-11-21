<script setup lang="ts">
import { type Movie } from '#shared/interfaces/movieInterface';

const { movieData } = defineProps<{
  movieData: Movie;
}>()

const Movieposter = movieData?.poster_path
  ? `http://image.tmdb.org/t/p/w500/${movieData.poster_path}`
  : '/img/No-image-found.jpg'
</script>

<template>
  <li class="list-item">
    <section class="list-item__content">
      <figure class="list-item__figure">
        <img class="list-item__poster" :src="Movieposter" :alt="movieData.title" />
      </figure>
      <p class="list-item__header">
        <strong class="list-item__title">
          {{ movieData.title }}
        </strong>
        <em class="list-item__subtitle">
          {{ movieData?.release_date || 'no info' }} - {{ movieData.original_language }}
        </em>
      </p>
      <p class="list-item__details">
        {{ movieData.vote_average * 10 }} %
      </p>
    </section>
  </li>
</template>