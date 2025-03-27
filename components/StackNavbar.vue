<script setup lang="ts">
import { mainPages } from '~~/utils/pages';

const menu = ref<HTMLElement | null>(null)
const isDarkTheme = ref('')

const toggleDark = () => {
  document.documentElement.classList.toggle('dark')

  localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

const toggleMenu = () => {
  menu.value?.classList.toggle('menu-active')
}

const closeMenu = () => {
  menu.value?.classList.remove('menu-active')
}
</script>

<template>
  <nav class="navbar glass print:hidden">
    <nuxt-link to="/" class="navbar-brand" @click="closeMenu">
      <img 
        src="/img/logo-mobile.png" 
        height="48" 
        width="48" 
        alt="logo"
      >
      stack-analyze
    </nuxt-link>
    <button class="btn-change" @click="toggleDark">
      <stack-fa icon="fa-solid fa-moon" class="light-icon" />
      <stack-fa icon="fa-solid fa-sun" class="dark-icon" />
    </button>
    <div class="menu-btn" @click="toggleMenu">
      <span class="bars"></span>
    </div>
    <menu class="menu" ref="menu">
      <li v-for="page of mainPages" :key="page.app" class="menu-item">
        <nuxt-link :to="page.path" class="menu-link" @click="closeMenu">
          {{ page.app }}
        </nuxt-link>
      </li>
    </menu>
  </nav>
</template>