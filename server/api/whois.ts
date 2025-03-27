import WhoisLight from 'whois-light'

type WhoisQuery = {
  website: string
}

export default defineEventHandler<{
  query: WhoisQuery
}>(async (event) => {
  const { website } = getQuery(event)

  if (website != '') {
    try {
      const data = await WhoisLight.lookup(website)

      return {
        website,
        info: data
      }
    } catch (err) {
      return { info: (err as Error).message }
    }
  }

  return { info: 'no blank query' }
})
