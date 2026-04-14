<script setup lang="ts">
// metadata
useHead({
  title: 'stack radio stations',
  meta: [
    { name: 'description', content: 'radio tool' },
    { name: 'keywords', content: 'stack-analyze, omega5300, quotes stack-analyze' }
  ]
})

const {
  clearStation, country, getStations, isPlaying,
  playRadio, stations, stopRadio
} = useStations()
</script>

<template>
  <main>
    <stack-input v-model="country" msg="enter a country some countries using eng name" :disabledInit="false"
      @init-function="getStations" :disabledClear="stations.length === 0" @clear-function="clearStation" />

    <ul class="glass stations">
      <li v-for="({ name, url, codec }, i) in stations">
        <button class="btn-primary" @click="playRadio(url)">
          <stack-fa :icon="['fas', 'play']" />
        </button>
        <article>
          <p>{{ name }}</p>
          <p>{{ codec }}</p>
        </article>
      </li>
    </ul>

    <section class="glass fab-btn" v-if="isPlaying">
      <button @click="stopRadio">
        <stack-fa :icon="['fas', 'pause']" />
      </button>
    </section>
  </main>
</template>