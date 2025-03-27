import cssValidator from 'w3c-css-validator'

type CSSValidate = {
  website: string
}

export default defineEventHandler<{
  query: CSSValidate
}>(async (event) => {
  const { website } = getQuery(event)

  try {
    const data = await cssValidator.validateURL(website)

    return data
  } catch(err) {
    return (err as Error).message
  }
})