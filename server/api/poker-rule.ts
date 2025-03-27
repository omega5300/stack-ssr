import { load } from "cheerio"

type Poker = {
  game: string
}

const bicycleURL: string = 'https://bicyclecards.com/how-to-play'

export default defineEventHandler<{
  query: Poker
}>(async (event) => {
  const { game } = getQuery(event)

  try {
    const page = await (
      await fetch(`${bicycleURL}/${game}`)
    ).text()

    const $ = load(page)

    const [age, players] = $(".border-brand-blue-pale div:not(.text-brand-blue)").map(
      (i, el) => $(el).text()
    ).get().slice(1);

    const howPlay = $("h3.text-2xl").map(
      (i, el) => $(el).text()
    ).get().slice(0, 5);

    return {
      title: $("title").text(),
      age, players, howPlay
    }
  } catch (err) {
    return (err as Error).message
  }
})
