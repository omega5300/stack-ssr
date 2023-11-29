<script setup lang="ts">
/* __placeholder__ */
import type { MovieSchema, Movie } from '~~/utils/interfaces/movieInterface';

useHead({
  title: 'movie info',
  meta: [
    { name: 'description', content: 'tool for query movie' },
    { name: 'keywords', content: 'stack-analyze, movie info, stack-analyze movie' }
  ],
  script: [
    { src: '/js/alert.js', body: true }
  ]
})

// config
const config = useRuntimeConfig()

// states
const movieTitle = ref('')
const movies = ref<Movie[]>([])

// computers
const isEmptyMovies = computed(() => movies.value.length === 0)

// methods
const searchMovies =async () => {
  if(!movieTitle.value) {
    alertMsg('this field is required', 'alert-warn')
    return
  }

  try {
    const data: MovieSchema = await $fetch('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: config.public.movieToken,
        query: movieTitle.value
      }
    })

    movies.value = data.results.sort((x, y) => {
      const primaryDate = new Date(x.release_date)
      
      const secondaryDate = new Date(y.release_date)

      return primaryDate.getTime() - secondaryDate.getTime()
    })
  } catch (err) {
    alertMsg((err as Error).message, 'alert-danger')
  }

  movieTitle.value = ''
}

const clearMovies = () => {
  movies.value = []
}
</script>

<template>
    <nuxt-layout name="query">
        <stack-input 
          v-model="movieTitle"
          :disabled-init="false" 
          msg="enter a movie for search"
          :disabled-clear="isEmptyMovies" 
          @init-function="searchMovies"
          @clear-function="clearMovies"
        />
        <ul class="glass list">
          <stack-movie v-for="movie of movies" :key="movie.id" :movie-data="movie" />
        </ul>
    </nuxt-layout>
</template>