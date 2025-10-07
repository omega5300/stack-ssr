<script setup lang="ts">
/* __placeholder__ */
import type { TwitchSchema, TwitchUser } from '~~/utils/interfaces/twitchInterface';

useHead({
  title: 'twitch info',
  meta: [
    { name: 'description', content: 'tool for query twitch user info' },
    { name: 'keywords', content: 'stack-analyze, bitly info, stack-analyze bitly info' }
  ],
})

const config = useRuntimeConfig()

// states
const userSearch = ref('')

const twitchUsers = ref<TwitchUser[]>([])

// computers
const isEmptyTwitchUsers = computed(
  () => twitchUsers.value.length === 0
)

// methods
const twitchInfo = async () => {
  if(!userSearch.value) {
    alertMsg('this field is required', 'alert-warn')
    return
  }
  
  // split
  const userList = userSearch.value.split('&');
  // params
  const params = new URLSearchParams();
  
  if(userList.length === 100) {
    alertMsg('users must be 100', 'alert-danger')
    return
  }
  
  userList.forEach((item) => {
    params.append('login', item)
  })
  
  try {
    const twitchData: TwitchSchema = await $fetch('https://api.twitch.tv/helix/users', {
      headers: {
        Authorization: `Bearer ${config.public.twitchToken}`,
        "Client-Id": config.public.twitchClient
      },
      params
    })
    
    twitchUsers.value = twitchData.data
  } catch (err) {
    alertMsg((err as Error).message, 'alert-danger')
  }
  
  userSearch.value = ''
}
const clearUsers = () => {
  twitchUsers.value = []
}
</script>

<template>
  <nuxt-layout name="query">
    <h1>twitch search info</h1>
    <stack-input 
      msg="enter a twitch users example: a&b&c" 
      v-model="userSearch"
      :disabled-init="false"
      :disabled-clear="isEmptyTwitchUsers"
      @init-function="twitchInfo"
      @clear-function="clearUsers"
    />
    <section class="result">
      <stack-twitch-card 
        v-for="user of twitchUsers" 
        :key="user.id" 
        :user="user" 
      />
    </section>
  </nuxt-layout>
</template>