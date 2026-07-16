import { load } from "cheerio";

type SwFreq = {
  freq: number
}

export default defineEventHandler<{ query: SwFreq }>(async (event) => {
  const { freq } = getQuery(event)

  try {
    const data = await (
      await fetch(`https://shortwave.live/khz?q=${freq}`)
    ).text()

    const $ = load(data)

    return $("tbody tr").map((i, el) => ({
      name: $(el).children("#station").text(),
      lang: $(el).children("#language").text(),
      days: $(el).children("#days").text(),
      startUTC: $(el).children("#start").text(),
      endUTC: $(el).children("#end").text(),
    })).toArray();
  } catch (err) {
    return 'problem to api'
  }
})
