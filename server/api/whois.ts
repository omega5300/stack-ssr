import WhoisLight from 'whois-light'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const { website } = query

  if (website != '') {
    try {
      const data = await WhoisLight.lookup(website as string)

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
