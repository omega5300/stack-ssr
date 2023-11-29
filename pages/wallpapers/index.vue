<script setup lang="ts">
import { wallpapers } from '~~/utils/wallpapers'

// metadata
useHead({
  title: 'stack wallpapers',
  meta: [
    { name: 'description', content: 'wallpaper of mixtreria' },
    { name: 'keywords', content: 'stack-analyze, omega5300, mixtreria, mixtreria wallpapers' }
  ]
})

// static
const wallpaperOpts = ['solMoon', 'dimensions']

// states
const wallpaperSelect = ref('')
</script>

<template>
  <main class="content">
    <section>
      <fieldset class="input-box">
        <select class="select-field" v-model="wallpaperSelect">
          <option value="">select a wallpaper list</option>
          <option v-for="wallpaper of wallpaperOpts" :value="wallpaper">
            {{ wallpaper }}
          </option>
        </select>
      </fieldset>

      <section class="h-[70vh] overflow-auto">
        <article 
          class="wallpapers"
        >
          <stack-img-col
            v-for="(wallpaper, i) of wallpapers[wallpaperSelect]" 
            :key="i" 
            :path="wallpaper" 
            :name="`${wallpaperSelect} ${i + 1}`" 
          />
        </article>
      </section>
    </section>
  </main>
</template>