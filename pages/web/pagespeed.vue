<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

useHead({
  title: 'pagespeed',
  meta: [
    { name: 'description', content: 'pagespeed tool using google api' },
    { name: 'keywords', content: 'stack pagespeed, pagespeed, stack-analyze' }
  ],
  script: [
    { src: '/js/alert.js', body: true }
  ]
})

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// chart opts
const chartOptions = {
  responsive: true
}

// composable
const { startWithHttp, validateWebsite, website } = useHttp()

// color result
const resultScore = (score: number) => {
  switch (true) {
    case score === 0 || score <= 49:
      return 'rgba(255, 0, 0, 0.6)'
    case score === 50 || score <= 89:
      return 'rgba(255, 255, 0, 0.6)'
    case score >= 90 || score === 100:
      return 'rgba(0, 255, 0, 0.6)'
  }
}

// states
const [desktopScore, mobileScore] = [ref(0), ref(0)]

// computers
const isEmptyResults = computed(
  () => !desktopScore.value && !mobileScore.value
)

const chartData = computed(() => ({
  labels: ['desktop', 'mobile'],
  datasets: [{
    label: 'pagespeed',
    data: [desktopScore.value, mobileScore.value],
    backgroundColor: [
      resultScore(desktopScore.value),
      resultScore(mobileScore.value)
    ],
    borderWidth: 1
  }]
}))

// pagespeed method
const getPagespeed = async () => {
  if (!website.value.match(startWithHttp)) return alertMsg('http or https:// is required', 'alert-warn')

  try {
    const [desktop, mobile] = [
      await usePagespeed(website.value, 'desktop'),
      await usePagespeed(website.value, 'mobile'),
    ]

    desktopScore.value = Math.round(
      desktop.lighthouseResult.categories.performance.score * 100
    );

    mobileScore.value = Math.round(
      mobile.lighthouseResult.categories.performance.score * 100
    );
  } catch (err) {
    alertMsg((err as Error).message, 'alert-danger')
  }

  website.value = ''
}

const resetPagespeed = () => {
  desktopScore.value = 0;
  mobileScore.value = 0;
}


</script>

<template>
  <NuxtLayout name="web">
    <h1>pagespeed</h1>
    <stack-input v-model="website" :disabled-init="validateWebsite" :disabled-clear="isEmptyResults"
      @init-function="getPagespeed" @clear-function="resetPagespeed" />
    <section class="glass w-3/6 p-2 h-[50vh] mx-auto">
      <bar class="max-h-full" :options="chartOptions" :data="chartData" />
    </section>
  </NuxtLayout>
</template>