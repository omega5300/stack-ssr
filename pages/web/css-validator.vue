<script lang="ts" setup>
useHead({
  title: 'css validator',
  meta: [
    { name: 'description', content: 'webscraping tool only in static webs not allow webs written with js' },
    { name: 'keywords', content: 'stack web scraping, web scraping, stack-analyze' }
  ],
})

const { startWithHttp, validateWebsite, website } = useHttp()

// states
const validateResults = ref('')

// computers
const isEmptyResults = computed(() => !validateResults.value)

// methods
const startValidate = async () => {
  if (!website.value.match(startWithHttp)) {
    return alertMsg('http or https:// is required', 'alert-warn')
  }

  try {
    validateResults.value = await $fetch('/api/css-validator', {
      params: { website: website.value },
    })
  } catch (err) {
    validateResults.value = (err as Error).message
  }

  website.value = ''
}

const resetValidate = () => {
  validateResults.value = ''
}
</script>

<template>
  <NuxtLayout name="web">
    <h1>css validator</h1>

    <stack-input v-model="website" :disabled-init="validateWebsite" :disabled-clear="isEmptyResults"
      @init-function="startValidate" @clear-function="resetValidate" />

    <section class="glass w-full p-0.5">
      <pre class="stack-result shell mx-auto">{{ validateResults }}</pre>
      <p class="warning text-center font-bold">warning some websites is not functional</p>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.warning {
  color: var(--warning)
}
</style>