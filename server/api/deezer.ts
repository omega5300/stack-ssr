export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const {search} = query

  try {
    const data = await (await fetch(
      `https://api.deezer.com/search/album?q=${search as string}&limit=100`, {
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
      }
    )).json()

    return data
  } catch(err) {
    return (err as Error)
  }
})