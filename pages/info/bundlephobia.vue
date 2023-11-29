<script setup lang="ts">
/* __placeholder__ */
import type { Bundlephobia } from '~~/utils/interfaces/bundlephobiaInterface';

useHead({
  title: 'bundlephobia info',
  meta: [
    { name: 'description', content: 'bundlephobia info for npm packges' },
    { name: 'keywords', content: 'stack bundlephobia, stack-analyze, bundlephobia info' }
  ],
  script: [
    { src: '/js/alert.js', body: true }
  ]
})

const pkgName = ref('')
const pkgInfo = ref<Partial<Bundlephobia>>({})

const isEmptyInfo = computed(
  () => Object.keys(pkgInfo.value).length === 0
)

const getPkgInfo = async () => {
  if (!pkgName.value) {
    alertMsg('this field is required', 'alert-warn')
    return
  }

  try {
    pkgInfo.value = await $fetch('https://bundlephobia.com/api/size', {
      params: {
        package: pkgName.value
      }
    })
  } catch (err) {
    alertMsg((err as Error).message, 'alert-danger')
  }

  pkgName.value = ''
}

const clearInfo = () => {
  pkgInfo.value = {}
}
</script>

<template>
  <nuxt-layout name="info">
    <h1>bundlephobia info module</h1>
    <stack-input v-model="pkgName" msg="enter a npm package" :disabled-init="false" :disabled-clear="isEmptyInfo" @init-function="getPkgInfo"
      @clear-function="clearInfo" />
    <section class="glass card mt-3 mx-auto max-w-fit">
      <h2 class="card-title">
        {{ pkgInfo.name || 'no name' }} {{ pkgInfo.version || '0.0.0' }}
      </h2>
      <article class="card-body">
        <p>{{ pkgInfo.description || 'no description' }}</p>
        <ul>
          <li v-for="assets of pkgInfo.assets" :key="assets.name">
            gzip: {{ assets.gzip }} - size: {{ assets.size }} 
          </li>
        </ul>
      </article>
      <footer class="card-btns">
        <a 
          class="btn btn-primary" 
          :href="pkgInfo.repository" 
          target="_blank" 
          rel="nofollow"
          title="go to repo"
        >
          <stack-fa icon="fa-brands fa-github" />
          go to {{ pkgInfo.name }} repo
        </a>
      </footer>
    </section>
  </nuxt-layout>
</template>