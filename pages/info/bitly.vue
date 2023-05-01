<script setup lang="ts">
import { format } from 'timeago.js'
import { Bitly } from '~~/utils/interfaces/bitlyInterface'

useHead({
  title: 'bitly info',
  meta: [
    { name: 'description', content: 'tool for reveal bitly link' },
    { name: 'keywords', content: 'stack-analyze, bitly info, stack-analyze bitly info' }
  ],
  script: [
    { src: '/js/alert.js', body: true }
  ]
})

// config var
const config = useRuntimeConfig()

// regex
const bitlyRegexp = /bit\.ly\//

// states
const bitlyURL = ref('')
const bitlyResults = ref<Partial<Bitly>>({})

// computers
const validateBitly = computed(() => !bitlyRegexp.test(bitlyURL.value))

const isEmptyBitlyInfo = computed(() => Object.keys(bitlyResults.value).length === 0)

// methods
const bitlyInfo = async () => {
  try {
    bitlyResults.value = await $fetch('https://api-ssl.bitly.com/v4/expand', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${config.public.bitlyToken}`,
        "Content-Type": "application/json",
      },
      body: { bitlink_id: bitlyURL.value }
    })
  } catch (err) {
    alertMsg((err as Error).message, 'alert-danger')
  }
  bitlyURL.value = ''
}
const resetBitlyInfo = () => {
  bitlyResults.value = {}
};
</script>

<template>
  <nuxt-layout name="info">
    <h1>bitly info</h1>
    <stack-input 
      v-model="bitlyURL" 
      msg="enter a bitly link"
      :disabled-init="validateBitly" 
      :disabled-clear="isEmptyBitlyInfo" 
      @init-function="bitlyInfo"
      @clear-function="resetBitlyInfo"
    />
    <section class="glass card card__info">
      <h2 class="card-title">
        {{ bitlyResults.link }}
      </h2>
      <h3 class="card-subtitle">
        {{ format(bitlyResults.created_at as string) }}
      </h3>
      <p class="card-details">{{ bitlyResults.long_url }}</p>
    </section>
  </nuxt-layout>
</template>