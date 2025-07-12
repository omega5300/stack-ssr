<script setup lang="ts">
useHead({
  title: 'password generator',
  meta: [
    { name: 'description', content: 'password generator tool designed for some user for search safe password' },
    { name: 'keywords', content: 'stack-analyze, password generator, stack-analyze password generator' }
  ],
})

// state
const password = ref('')

// computed
const isEmptyPassword = computed(() => password.value.length === 0)

// methods
const generatePassword = () => {
  const chars = '01234567890abcdefghijklmnoprqstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let retVal = '';
  for (let i = 0; i < 12; i++) {
    retVal += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  password.value = retVal
}
const copyPassword = async () => {
  await navigator.clipboard.writeText(password.value)

  alertMsg('copied', 'alert-warn')
}
const resetPassword = () => {
  password.value = ''

  alertMsg('this generation is clean', 'alert-danger')
}
</script>

<template>
    <nuxt-layout name="utility">
      <h1 class="title">password generator</h1>
      <section class="glass card card__info">
        <p class="card-title">{{ password || 'no password' }}</p>
        <article class="card-btns mx-auto w-fit">
          <button class="btn btn-primary" @click="generatePassword">
            <stack-fa class="h-6" icon="fa-solid fa-dice" />
          </button>
          <button class="btn btn-secondary" :disabled="isEmptyPassword" @click="copyPassword">
            <stack-fa class="h-6" icon="fa-solid fa-clipboard" />
          </button>
          <button class="btn btn-danger" :disabled="isEmptyPassword" @click="resetPassword">
            <stack-fa class="h-6" icon="fa-solid fa-refresh" />
          </button>
        </article>
      </section>
    </nuxt-layout>
</template>