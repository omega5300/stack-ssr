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
        { children: 'JavaScript is required' }
      ]
    },
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/main.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {
        overrideBrowserslist: ['> 0.2% and not dead'],
      },
    }
  },

  vite: {
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('swiper-')
    }
  },
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