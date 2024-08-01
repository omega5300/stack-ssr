<script setup lang="ts">
import { type Pokemon } from '~/utils/interfaces/pokemonInterface';
import { Bar } from 'vue-chartjs'
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

useHead({
  title: 'pokemon info',
  meta: [
    { name: 'description', content: 'pagespeed tool using google api' },
    { name: 'keywords', content: 'stack pokemon info, pokemon, stack-analyze' }
  ],
  script: [
    { src: '/js/alert.js' }
  ]
})

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// static
const maxStats: number[] = [255, 194, 230, 180, 230, 200]

const statLabels: string[] = [
  'hp', 'attack', 'defense', 'special attack',
  'special defense', 'speed', 'xp'
]

const starColors: string[] = [
  'rgb(255 0 0 / 60%)', 'rgb(255 255 0 / 60%)', 'rgb(68 0 255 / 60%)',
  'rgb(0 0 255 / 60%)', 'rgb(0 255 0 / 60%)', 'rgb(255 0 255 / 60%)',
  'rgb(0 255 255 / 60%)'
]

const chartOptions = {
  responsive: true,
  indexAxis: 'y',
  plugins: {
    title: {
      display: true,
      text: 'pokemon stats'
    }
  },
  scales: {
    x: { min: 0, max: 635 }
  }
}

// state
const pokemon = ref<number | string>('')

// states poke info
const pokeDefaultSpite = ref('')
const pokemonID = ref(0)
const pokemonName = ref('')
const pokemonTypes = ref<string[]>([])
const pokemonStats = ref<number[]>([])

// computers
const isEmptyPokeInfo = computed(() => !pokemonID.value)

const chartData = computed(() => ({
  labels: statLabels,
  datasets: [{
    label: 'stats',
    data: [...pokemonStats.value],
    backgroundColor: starColors,
    borderWidth: 1
  }],
}))

const pokemonSearch = async () => {
  if (!pokemon.value || (pokemon.value as number) <= 0) {
    return alertMsg(
      'pokemon name is required avoid pokemon id: 0 & negative number',
      'alert-warn'
    )
  }

  try {
    const {
      id, name, base_experience,
      sprites, stats, types
    } = await $fetch<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.value}`
    )

    pokemonID.value = id
    pokemonName.value = name
    pokeDefaultSpite.value = sprites.front_default

    pokemonTypes.value = types.map(({ type }) => type.name)

    stats.forEach(({ base_stat }, i) => {
      pokemonStats.value.push(base_stat)
    })

    pokemonStats.value.push(base_experience)
  } catch (err) {
    alertMsg((err as Error).message, 'alert-danger')
  }

  pokemon.value = ''
}

const clearPokemonInfo = () => {
  pokemonID.value = 0
  pokemonName.value = ''
  pokeDefaultSpite.value = ''
  pokemonTypes.value = []
  pokemonStats.value = []
}


</script>

<template>
  <nuxt-layout name="query">
    <section>
      <fieldset class="input-box">
        <input class="input-field" type="text" placeholder="search pokemon" v-model.number="pokemon">
      </fieldset>

      <section class="btns">
        <button class="btn btn-success" @click="pokemonSearch">start</button>
        <button class="btn btn-danger" @click="clearPokemonInfo" :disabled="isEmptyPokeInfo">reset</button>
      </section>

      <section class="glass card card__info">
        <figure class="card-header">
          <img class="card-image" :src="pokeDefaultSpite || '/img/No-image-found.jpg'" alt="pokemon default style">
          <figcaption class="card-title">
            # {{ pokemonID }} - {{ pokemonName || 'no pokemon' }}
          </figcaption>
        </figure>

        <ul class="flex justify-center gap-2">
          <poke-type v-for="type of pokemonTypes" :key="type" :type="type" />
        </ul>

        <section class="w-3/6 p-2 h-[50vh] mx-auto">
          <bar :options="chartOptions" :data="chartData" />
        </section>
      </section>
    </section>
  </nuxt-layout>
</template>