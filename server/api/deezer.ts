type DeezerQuery = {
  search: string
}

export default defineEventHandler<{
  query: DeezerQuery
}>(async (event) => {
  const {search} = getQuery(event)

  try {
    const data = await (await fetch(
      `https://api.deezer.com/search/album?q=${search}&limit=100`, {
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
      }
    )).json()

    return data
  } catch(err) {
    return (err as Error)
  }
})