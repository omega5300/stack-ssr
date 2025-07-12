<script setup lang="ts">
import { quotes } from '~/composables/quotesFunctions'

// metadata
useHead({
  title: 'stack quotes',
  meta: [
    { name: 'description', content: 'quotes tool' },
    { name: 'keywords', content: 'stack-analyze, omega5300, quotes stack-analyze' }
  ]
})

// static
const quotesOpts = ['anime']
const placeholder = 'enter a quote for seach or leave blank if your search is anime'

const { 
  isEmptyValues, quoteSearch, quotesContent, quotesFunctions, 
  quotesSelect, 
} = quotes()
</script>

<template>
<main class="content">
  <section>
    <fieldset class="input-box">
      <select class="select-field" v-model="quotesSelect">
        <option value="">select a quoute option select</option>
        <option v-for="quote of quotesOpts" :value="quote">
          {{ quote }}
        </option>
      </select>
      <input class="input-field" type="text" :placeholder v-model="quoteSearch" />
    </fieldset>
    <fieldset class="btns">
      <button 
        class="btn btn-success" 
        @click="quotesFunctions[quotesSelect]" 
        :disabled="!quotesSelect"
      >search quote</button>
      <button 
        class="btn btn-danger" 
        @click="quotesFunctions.clearQuotes" 
        :disabled="isEmptyValues"
      >clear quotes</button>
    </fieldset>

    <pre class="stack-result mx-auto">{{ quotesContent }}</pre>
  </section>
</main>
</template>