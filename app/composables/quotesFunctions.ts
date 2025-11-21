import type { Quote } from '#shared/interfaces/quotesInterface'

// types
interface QuotesFunctions {
  [key: string]: () => Promise<void> | void
}

export const quotes = () => {

  // states
  const quotesSelect = ref('')
  const quoteSearch = ref('')
  const quotesContent = ref<Quote>({})

  const isEmptyValues = computed(
    () => Object.values(quotesContent.value).length === 0
  )

  // quotes options functions
  const quotesFunctions: QuotesFunctions = {
    anime: async () => {
      try {
        const data = await $fetch<Quote>('https://api.animechan.io/v1/quotes/random', {
          query: { anime: quoteSearch.value }
        })

        quotesContent.value = data
      } catch (err) {
        alertMsg((err as Error).message, 'alert-danger')
      }

      quotesSelect.value = ''
      quoteSearch.value = ''
    },
    swift: async () => {
      try {
        const data = await $fetch<Quote>('https://taylorswiftapi.onrender.com/get')

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