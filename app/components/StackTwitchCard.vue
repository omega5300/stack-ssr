<script setup lang="ts">
import { format } from 'timeago.js'

const { user } = defineProps<{
  user: TwitchUser
}>()
</script>

<template>
  <article class="glass card">
    <figure class="card-header">
      <img 
        class="card-image" 
        :src="user.profile_image_url" 
        :alt="user.login" 
      />
      <figcaption class="card-subtitle">
        account age: {{ format(user.created_at) }}
      </figcaption>
    </figure>
    <h2 class="card-title">{{ user.login }}</h2>
    <article  class="card-body">
      <ul role="list" class="info-list">
        <li>broadcaster: {{ user.broadcaster_type || "user" }}</li>
        <li>views: {{ user.view_count }}</li>
      </ul>
      <p>{{ user.description || "no description" }}</p>
    </article>
  </article>
</template>