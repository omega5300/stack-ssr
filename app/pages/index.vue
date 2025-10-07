<script setup lang="ts">
useHead({
  title: 'stack-analyze',
  meta: [
    { name: 'description', content: 'sets of services for the analysis of technologies and entertainment hobbies.' },
    { name: 'keywords', content: 'stack-analyze, omega5300' }
  ]
})


</script>

<template>
  <main class="content">
    <h1 class="page-title">stack-analyze</h1>

    <section class="home-section">
      <ul class="version">
        <li class="glass my-2" v-for="{ details, version } in versionsNotes" :key="version">
          <h2>version {{ version }}</h2>
          <p class="version-details">{{ details }}</p>
        </li>
      </ul>

      <article class="glass p-2">
        <h2 class="text-center">Recomendations</h2>
        
        <ul>
          <li v-for="youtube of youtubeRecomendations" :key="youtube.name">
            <a :href="youtube.link" target="_blank">
              <stack-fa :icon="youtube.logo" />
              <strong class="ml-3">{{ youtube.name }}</strong>
            </a>
          </li>

          <li v-for="ig of instagramRecomendations" :key="ig.name">
            <a :href="ig.link" target="_blank">
              <stack-fa :icon="ig.logo" />
              <strong class="ml-3">{{ ig.name }}</strong>
            </a>
          </li>

          <li v-for="twitch of twitchRecomendations" :key="twitch.name">
            <a :href="twitch.link" target="_blank">
              <stack-fa :icon="twitch.logo" />
              <strong class="ml-3">{{ twitch.name }}</strong>
            </a>
          </li>
        </ul>
      </article>
    </section>
  </main>
</template>