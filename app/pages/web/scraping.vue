<script setup lang="ts">
useHead({
  title: 'web scraping',
  meta: [
    { name: 'description', content: 'webscraping tool only in static webs not allow webs written with js' },
    { name: 'keywords', content: 'stack web scraping, web scraping, stack-analyze' }
  ],
})

// static params
const scrapingOptList = [
  "title", "images", "metadata", "headings",
  "tableHead", "tableData", "links", "cites"
]

const { startWithHttp, validateWebsite, website } = useHttp()

// states
const scrapingOpt = ref("");

const resultScraping = ref<string | WebScraping[]>('')

// computed
const shellClass = computed(
  () => resultScraping.value !== "" ? "shell-results" : ""
)

const validateScraping = computed(() => !scrapingOpt.value)

const isEmptyScraping = computed(() => !resultScraping.value)

// methods
const startScraping = async () => {
  if (!website.value.match(startWithHttp)) {
    return alertMsg('http or https:// is required', 'alert-warn')
  }

  try {
    resultScraping.value = await $fetch('/api/scraping', {
      query: {
        website: website.value,
        opt: scrapingOpt.value
      }
    })
  } catch (err) {
    resultScraping.value = (err as Error).message
  }

  website.value = ''
  scrapingOpt.value = ''
}

const resetScraping = () => {
  resultScraping.value = ""
}
</script>

<template>
  <NuxtLayout name="web">
    <h1>web scraping</h1>
    <section>
      <fieldset class="input-box">
        <input class="input-field" type="text" placeholder="enter a url" v-model="website" />
        <select class="select-field" v-model="scrapingOpt" :disabled="validateWebsite">
          <option value="">enter a scraping opt</option>
          <option v-for="option in scrapingOptList" :key="option" :value="option">{{ option }}</option>
        </select>
      </fieldset>
      <section class="btns">
        <button class="btn btn-success" @click="startScraping" :disabled="validateScraping">start</button>
        <button class="btn btn-danger" @click="resetScraping" :disabled="isEmptyScraping">reset</button>
      </section>
    </section>
    <section class="glass w-full p-0.5">
      <pre :class="['stack-result', 'shell', shellClass, 'mx-auto']">{{
  resultScraping || "wait scraping results" 
      }}</pre>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.input-box {
  display: flex;
  gap: 8px
}
</style>
