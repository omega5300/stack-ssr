import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      bitlyToken: process.env.BITLY_TOKEN,
      movieToken: process.env.MOVIE_TOKEN,
      twitchClient: process.env.TWITCH_CLIENT,
      twitchToken: process.env.TWITCH_TOKEN,
    }
  },

  app: {
    rootId: 'root',
    rootTag: 'body',
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      noscript: [
        { textContent: 'JavaScript is required' }
      ]
    },
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/main.css',
  ],

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  vue: {},

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/vue-fontawesome'
    ]
  },

  compatibilityDate: '2024-07-22',
})