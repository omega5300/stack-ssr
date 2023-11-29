<script setup lang="ts">
import { type CryptoSchema } from '~~/utils/interfaces/cryptoInterface';

useHead({
  title: 'crypto market',
  meta: [
    { name: 'description', content: 'tool readonly and search crypto and value' },
    { name: 'keywords', content: 'stack crypto, stack-analyze, crypto service' }
  ]
})

const currency = Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});

const titles = ["#", "Coin", "Price", "Price Change"]

const coinList = ref<CryptoSchema[]>([])

const filterCoins = ref<CryptoSchema[]>([])

const loading = ref(true)

const error = ref('')

watchEffect(async () => {
  try {
    const data = await $fetch<CryptoSchema[]>('https://api.coingecko.com/api/v3/coins/markets', {
      params: { vs_currency: "usd" }
    })

    coinList.value = data
    filterCoins.value = data

    setTimeout(() => {
      loading.value = false
    }, 5000)
  } catch (err) {
    error.value = (err as Error).message
  }
})

const handleChange = (e: Event) => {
  const query = (e.target as HTMLInputElement).value.toLowerCase()

  filterCoins.value  = coinList.value.filter(
    d => d.name.toLowerCase().includes(query) || d.symbol.toLowerCase().includes(query)
  )
}
</script>

<template>
  <nuxt-layout name="info">
    <h1>crypto market</h1>
    <section>
      <fieldset class="input-box">
        <input class="input-field" type="search" placeholder="search a coin" @keyup="handleChange" />
      </fieldset>
    </section>
    <ul class="glass crypto-list">
      <stack-skeleton v-if="loading" />
      <stack-item v-else-if="filterCoins" v-for="coin of filterCoins" :key="coin.id" :coin="coin" />
      <li v-else-if="error">{{ error }}</li>
    </ul>
  </nuxt-layout>
</template>