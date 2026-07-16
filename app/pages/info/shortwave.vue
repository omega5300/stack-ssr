<script setup lang="ts">
type ShortwaveStations = {
  name: string
  lang: string
  days: string
  startUTC: string
  endUTC: string
}

useHead({
  title: 'shortwave list',
  meta: [
    { name: 'description', content: 'search & get shortwave stations using showrtwave.live data' },
    { name: 'keywords', content: 'stack shortwave radio, shortwave info, stack-analyze' }
  ]
})

const MIN_SW_FREQ: number = 2300
const MAX_SW_FREQ: number = 26100

const ROW_TITLES: Readonly<string[]> = ['name', 'lang', 'days', 'startUTC', 'endUTC',]

const shortwaveFreq = ref(0)
const shortwaveStations = ref<ShortwaveStations[]>([])

const shortwaveFreqValidate = computed(() => shortwaveFreq.value >= MIN_SW_FREQ && shortwaveFreq.value <= MAX_SW_FREQ)

const getStations = async () => {
  try {
    shortwaveStations.value = await $fetch('/api/shortwave', {
      query: { freq: shortwaveFreq.value }
    })
  } catch (err) {
    alert((err as Error).message)
  }

  shortwaveFreq.value = 0
}

const clearStations = () => {
  shortwaveStations.value = []
}
</script>

<template>
  <nuxt-layout name="info">
    <h1>shortwave list stations</h1>

    <section>
      <fieldset class="input-box">
        <input class="input-field" type="number" :min="MIN_SW_FREQ" :max="MAX_SW_FREQ" v-model="shortwaveFreq">
      </fieldset>
      <section class="btns">
        <button class="btn btn-success" @click="getStations" :disabled="!shortwaveFreqValidate">get stations</button>
        <button class="btn btn-danger" @click="clearStations" :disabled="shortwaveStations.length === 0">clear
          stations</button>
      </section>
    </section>

    <section class="glass" v-if="shortwaveStations.length === 0">
      <p class="card-title" >no stations</p>
    </section>

    <section class="glass shortwave-container" v-else>
      <table class="shortwave-table">
        <thead class="shortwave-table-head">
          <tr>
            <th scope="col" class="shortwave-table-col" v-for="title of ROW_TITLES">{{ title }}</th>
          </tr>
        </thead>

        <tbody>
          <tr class="shortwave-table-body" v-for="({ days, endUTC, lang, name, startUTC }) of shortwaveStations">
            <th scope="row">{{ name }}</th>
            <td>{{ lang }}</td>
            <td>{{ days }}</td> 
            <td>{{ startUTC }}</td>
            <td>{{ endUTC }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </nuxt-layout>
</template>