<script setup lang="ts">
import { Whois } from '~~/utils/interfaces/whoisInterface';

useHead({
  title: 'whois info',
  meta: [
    { name: 'description', content: 'tools for query domain info' },
    { name: 'keywords', content: 'stack whois, stack-analyze, whois info' }
  ],
  script: [
    { src: '/js/alert.js', body: true }
  ]
})

const { startWithHttp, validateWebsite, website } = useHttp()

const whoisInfo = ref<Partial<Whois>>({})

const isEmptywhoisInfo = computed(
  () => Object.keys(whoisInfo.value).length === 0
)

const clearDomainInfo = () => {
  whoisInfo.value = {}
}

const getDomainInfo = async () => {
  if (website.value.match(startWithHttp)) {
    alertMsg('http or https is not neccesary', 'alert-warn')
    return
  }

  try {
    whoisInfo.value = await $fetch('/api/whois', {
      query: {
        website: website.value
      }
    })
    console.info(whoisInfo.value)
  } catch (err) {
    alertMsg((err as Error).message, 'alert-danger')
  }

  website.value = ''
}
</script>

<template>
  <NuxtLayout name="web">
    <h1>whois info</h1>
    <stack-input v-model="website" :disabled-init="validateWebsite" :disabled-clear="isEmptywhoisInfo"
      @init-function="getDomainInfo" @clear-function="clearDomainInfo" />
    <section class="glass w-full p-0.5">
      <h2 class="text-center font-bold text-lg">
        website: {{ whoisInfo.website || 'no domain info' }}
      </h2>
      <pre class="stack-result mx-auto">{{
        whoisInfo.info || 'no info' 
      }}</pre>
    </section>
  </NuxtLayout>
</template>