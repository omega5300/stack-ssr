<script setup lang="ts">
import { stringify } from 'postcss';
import { Pokemon } from '~/utils/interfaces/pokemonInterface';

interface Stats {
  name: string
  color: string
  value: number
  maxValue: number
}

interface Special {
  [key: string]: string
}

useHead({
  title: 'pokemon info',
  meta: [
    { name: 'description', content: 'pagespeed tool using google api' },
    { name: 'keywords', content: 'stack pokemon info, pokemon, stack-analyze' }
  ],
  script: [
    { src: '/js/alert.js', body: true }
  ]
})

// static
const maxStats = [255, 194, 230, 180, 230, 200]

// state
const pokemon = ref<number | string>('')

// states poke info
const pokeDefaultSpite = ref('')
const pokemonID = ref(0)
const pokemonName = ref('')
const pokemonTypes = ref<string[]>([])
const pokemonStats = ref<Stats[]>([])

// 
const isEmptyPokeInfo = computed(() => !pokemonID.value)

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

    stats.forEach(({ base_stat, stat }, i) => {
      const specialName: Special = {
        'special-defense': 'S.def',
        'special-attack': 'S.atk',
        'attack': 'atk',
        'defense': 'def',
      }

      pokemonStats.value.push({
        name: specialName[stat.name] || stat.name,
        color: stat.name,
        value: base_stat,
        maxValue: maxStats[i]
      })
    })

    pokemonStats.value.push({
      name: 'xp',
      color: 'xp',
      value: base_experience,
      maxValue: 635
    })
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

onMounted(() => {
  alertMsg(
    'warning this tool not using in firefox',
    'alert-warn'
  )
})
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

        <article>
          <poke-stat v-for="stat of pokemonStats" :key="stat.name" :stat-color="stat.color" :stat-name="stat.name"
            :stat-value="stat.value" :stat-max-value="stat.maxValue" />
        </article>
      </section>
    </section>
  </nuxt-layout>
</template>