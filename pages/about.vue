<script setup lang="ts">
useHead({
  title: 'about app',
  meta: [
    { name: 'description', content: 'about tool, version & lineup' },
    { name: 'keywords', content: 'stack-analyze, stack-analyze about' }
  ],
})
</script>

<template>
<main class="about-cards">
  <article class="glass card card__info about-card" v-for="card of cards" :key="card.id">
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
</main>

<!-- <client-only>
  <swiper-container :loop="true" :pagination="true" :slidesPerView="3">
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
  </swiper-container>
</client-only> -->
</template>
