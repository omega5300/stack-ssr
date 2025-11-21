<script setup lang="ts">
/* __placeholder__ */
import type { CryptoSchema } from '#shared/interfaces/cryptoInterface';

const { coin } = defineProps<{
  coin: CryptoSchema
}>()

const currency = Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
})
</script>

<template>
  <li class="list-item">
    <section class="list-item__content">
      <figure class="list-item__figure">
        <img class="w-8 h-8" :src="coin.image" :alt="coin.name">
      </figure>
      <p class="list-item__header">
        <strong class="list-item__title">
          {{ coin.name }} - {{ coin.symbol }}
        </strong>
        <em class="list-item__subtitle">
          {{ coin.price_change_percentage_24h }} %
        </em>
      </p>
      <p class="list-item__details">
        {{ currency.format(coin.price_change_percentage_24h) }} USD
      </p>
    </section>
  </li>
</template>