type MagicBallQuery = {
  lang: 'en' | 'es'
  question: string
}

export default defineEventHandler<{
  query: MagicBallQuery
}>(async (event) => {
  const { lang, question } = getQuery(event)

  try {
    const data = await (await fetch(
      `https://eightballapi.com/api/biased?question=${question}&locale=${lang}`, {
      // headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
    })).json()

    return data
  } catch (err) { 
    return { error: (err as Error).message }
  }
})
