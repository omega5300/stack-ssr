import cssValidator from 'w3c-css-validator'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const { website } = query

  try {
    const data = await cssValidator.validateURL(website as string)

    return data
  } catch(err) {
    return (err as Error).message
  }
})