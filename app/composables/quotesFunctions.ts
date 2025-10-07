import type { AnimeQuote } from '~/utils/interfaces/quotesInterface'

// types
interface QuotesFunctions {
  [key: string]: () => Promise<void> | void
}

export const quotes = () => {

  // states
  const quotesSelect = ref('')
  const quoteSearch = ref('')
  const quotesContent = ref({})

  const isEmptyValues = computed(
    () => Object.values(quotesContent.value).length === 0
  )

  // quotes options functions
  const quotesFunctions: QuotesFunctions = {
    anime: async () => {
      try {
        const { data } = await $fetch<AnimeQuote>('https://api.animechan.io/v1/quotes/random', {
          params: { anime: quoteSearch.value }
        })

        quotesContent.value = data
      } catch (err) {
        alertMsg((err as Error).message, 'alert-danger')
      }

      quotesSelect.value = ''
      quoteSearch.value = ''
    },
    clearQuotes: () => {
      quotesContent.value = {}
    }
  }

  return {
    quotesSelect, quoteSearch, quotesContent, isEmptyValues,
    quotesFunctions
  }
}