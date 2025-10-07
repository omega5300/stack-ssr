<script setup lang="ts">
import { format } from 'timeago.js'
import { type GithubSchema } from '~~/utils/interfaces/githubInterface'

useHead({
  title: 'github info',
  meta: [
    { name: 'description', content: 'search & get github profile info' },
    { name: 'keywords', content: 'stack web github, github info, stack-analyze' }
  ],
})

// states
const gitUsername = ref('')

const gitUserInfo = ref<Partial<GithubSchema>>({})

// computers
const isEmptyGithubUser = computed(
  () => Object.values(gitUserInfo.value).length === 0
)

const canTwitter = computed(
  () => !gitUserInfo.value.twitter_username 
    ? 'no twitter' 
    : `@${gitUserInfo.value.twitter_username}`
)

// methods
const githubSearch = async () => {
  try {
    const data: GithubSchema = await $fetch(`https://api.github.com/users/${gitUsername.value}`)
    gitUserInfo.value = data
  } catch (err) {
    alert((err as Error).message)
  }
  gitUsername.value = ''
}

const clearGithubUser = () => {
  gitUserInfo.value = {}
}
</script>

<template>
  <nuxt-layout name="info">
    <h1>github info</h1>
    <stack-input 
      v-model="gitUsername" 
      msg="enter a github user"
      :disabled-init="false" 
      :disabled-clear="isEmptyGithubUser" 
      @init-function="githubSearch"
      @clear-function="clearGithubUser"
    />
    <section class="glass card card__info">
      <figure class="card-header">
        <img class="card-image" :src="gitUserInfo.avatar_url" :alt="gitUserInfo.name" />
        <figcaption class="card-subtitle">
          {{ gitUserInfo.name || 'no name' }}
        </figcaption>
      </figure>
      <h2 class="card-title">
        {{ gitUserInfo.login || 'login' }} - {{ canTwitter }}
      </h2>
      <article class="card-body">
        <h3 class="card-details">
          account age: {{ format(gitUserInfo.created_at as string) }}
        </h3>
        <p>{{ gitUserInfo.bio }}</p>
        <ul role="list" class="info-list">
          <li>repos: {{ gitUserInfo.public_repos }}</li>
          <li>gist: {{ gitUserInfo.public_gists }}</li>
          <li>followers: {{ gitUserInfo.followers }}</li>
          <li>following: {{ gitUserInfo.following }}</li>
        </ul>
      </article>
      <footer class="card-btns">
        <a :href="gitUserInfo.url" class="btn btn-dark" title="go to profile">
          <stack-fa class="icon" icon="fa-brands fa-github" />
          {{ gitUserInfo.login }} profile
        </a>
      </footer>
    </section>
  </nuxt-layout>
</template>