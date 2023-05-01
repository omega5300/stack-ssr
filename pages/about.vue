<script setup lang="ts">
import { Navigation } from "swiper"

import { Swiper, SwiperSlide } from "swiper/vue"

import 'swiper/css'
import 'swiper/css/navigation'

useHead({
  title: 'about app',
  link: [
    { rel: 'stylesheet', href: '/css/slider.css' }
  ],
  meta: [
    { name: 'description', content: 'about tool, version & lineup' },
    { name: 'keywords', content: 'stack-analyze, stack-analyze about' }
  ]
})

const modules = [Navigation]
</script>

<template>
  <swiper :modules="modules" navigation loop tag="main" wrapper-tag="section">
    <swiper-slide v-for="card of cards" :key="card.id">
      <article class="glass card card__info">
        <figure>
          <img class="card-image" :src="card.img" :alt="card.id">
          <figcaption class="card-subtitle">
            {{ card.details }}
          </figcaption>
        </figure>
        <h2 class="card-title">{{ card.title }}</h2>
        <ul role="list" class="info-list">
          <li v-for="social of card.social" :key="social.socialID">
            <a :href="social.link" target="_blank" rel="noindex" class="btn">
              <stack-fa class="fa-3x" :icon="social.logo" />
            </a>
          </li>
        </ul>
      </article>
    </swiper-slide>
  </swiper>
</template>
