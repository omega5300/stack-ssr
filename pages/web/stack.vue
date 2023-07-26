<script setup lang="ts">
import { TechStack } from '~~/utils/interfaces/stackInterface'

useHead({
  title: 'tech-stack',
  meta: [
    { name: 'description', content: 'tech-stack tools analyze' },
    { name: 'keywords', content: 'stack tech-stack, tech-stack, stack-analyze, analyze tecnologies' }
  ],
  script: [
    { src: '/js/alert.js', body: true }
  ]
})

const { website, validateWebsite, startWithHttp } = useHttp()

const apps = ref<TechStack[]>([])

const isEmptyApps = computed(() => apps.value.length === 0)

const getStack = async () => {
  if (!website.value.match(startWithHttp)) return alertMsg('http or https:// is required', 'alert-warn')

  try {
    apps.value = await $fetch<TechStack[]>('https://stack-analyze-api.onrender.com/stack', {
      params: { url: website.value }
    })
  } catch (err) {
    alertMsg((err as Error).message, 'alert-danger')
  }
  website.value = ''
}

const resetStack = () => {
  apps.value = []
}
</script>

<template>
  <nuxt-layout name="web">
    <h1 class="page-title">tech-stack</h1>
    <stack-input 
      v-model="website" 
      :disabled-init="validateWebsite" 
      :disabled-clear="isEmptyApps"
      @init-function="getStack" 
      @clear-function="resetStack" 
    />

    <section class="result">
      <tech-stack-card v-for="app of apps" :key="app.id" :stack-data="app" />
    </section>
  </nuxt-layout>
</template>