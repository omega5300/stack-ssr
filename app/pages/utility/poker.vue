<script setup lang="ts">
import type { PokerRule } from '#shared/interfaces/pokerInterface'

useHead({
  title: 'poker game rule',
  meta: [
    { name: 'description', content: 'password generator tool designed for some user for search safe password' },
    { name: 'keywords', content: 'stack-analyze, password generator, stack-analyze password generator' }
  ],
})

// static
const options: readonly string[] = [
  "go-fish", "gin-rummy", "blackjack", 
  "slapjack", "basics-of-poker", "texas-holdem-poker"
]

const pokerGame = ref('')

const rule = ref<PokerRule>({
  title: '',
  age: '',
  players: '',
  howPlay: []
})

const getPokerRule = async () => {
  try {
    rule.value = await $fetch('/api/poker-rule', {
      query: { game: pokerGame.value }
    })
  } catch (err) {
    alertMsg((err as Error).message, 'alert-danger')
  }

  pokerGame.value = ''
}

const clearPokerRule = () => {
  rule.value = {
    title: '',
    age: '',
    players: '',
    howPlay: []
  }
}
</script>

<template>
  <nuxt-layout name="utility">
    <h1>poker game rule</h1>

    <section>
      <select class="select-field" v-model="pokerGame">
        <option value="">select a poker game</option>
        <option v-for="game of options" :value="game"
        >{{ game }}</option>
      </select>
    </section>
    <section class="btns">
      <button 
        class="btn btn-success" 
        :disabled="!pokerGame"
        @click="getPokerRule"
      >start</button>
      <button 
        class="btn btn-danger" 
        :disabled="!rule.title"
        @click="clearPokerRule"
      >reset</button>
    </section>

    <section class="glass card">
      <h2 class="card-title">
        {{ rule.title || 'no game' }}
      </h2>
      
      <ul class="info-list">
        <li>age: {{ rule.age || 'no age' }}</li>
        <li>players: {{ rule.players || '0' }}</li>
      </ul>

      <ul>
        <li v-for="(game, i) of rule.howPlay">
          {{ i + 1 }}. {{ game }}
        </li>
      </ul>
    </section>
  </nuxt-layout>
</template>