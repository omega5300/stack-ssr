<script setup lang="ts">
useHead({
  title: 'magic ball',
  meta: [
    { name: 'description', content: 'webscraping tool only in static webs not allow webs written with js' },
    { name: 'keywords', content: 'stack web scraping, web scraping, stack-analyze' }
  ],
})

// static
const langList: Readonly<string[]> = ['es', 'en']

const localeKeyword: { [s: string]: string; } = {
  en: "magic ball say:",
  es: "la bola magic te dice:"
};

// state
const question = ref('');
const lang = ref('');
const anwser = ref('');

// methods
const getAnwser = async () => {
  try {
    const data: MagicBall = await $fetch('/api/magic-ball', {
      query: {
        lang: lang.value,
        question: question.value,
      }
    });
    
    anwser.value = `${localeKeyword[data.locale]}: ${data.reading}`;
  } catch (err) { 
    anwser.value = (err as Error).message
  }
  
  lang.value = ''
  question.value = ''
}

const clearAnwser = () => {
  anwser.value = ''
}
</script>

<template>
  <nuxt-layout name="utility">
    <h1>magic ball</h1>
    
    <section>
      <fieldset class="input-box">
        <input class="input-field" type="text" placeholder="enter a question" v-model="question" />
        <select class="select-field" v-model="lang">
          <option value="">enter a scraping opt</option>
          <option v-for="option in langList" :key="option" :value="option">{{ option }}</option>
        </select>
      </fieldset>
      <section class="btns">
        <button class="btn btn-success" @click="getAnwser" :disabled="question.length <= 10">start</button>
        <button class="btn btn-danger" @click="clearAnwser" :disabled="anwser === ''">reset</button>
      </section>
    </section>

    <section class="glass w-full p-4 m-3">
      {{ anwser || 'no anwswer' }}
    </section>
  </nuxt-layout>
</template>