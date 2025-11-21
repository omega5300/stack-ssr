import { load } from 'cheerio'
import type {
  HashFunctions,
  WebScraping
} from '#shared/scrapingInterface'

type Scraping= {
  website: string
  opt: string
}

export default defineEventHandler<{query: Scraping}>(async (event) => {
  const { website, opt } = getQuery(event)
  try {
    const data = await (
      await fetch(website)
    ).text()

    const $ = load(data)

    const scraping: HashFunctions = {
      title() {
        return $('title').text()
      },
      images(): string | WebScraping[] {
        const imagesList = $('img').map((i, el) => ({
          imageURL: $(el).attr('src'),
          imageTitle: $(el).attr('alt')
        })).toArray()

        return imagesList.length === 0
          ? 'no found images'
          : imagesList
      },
      metadata(): string | WebScraping[] {
        const metadataList = $("meta").map((i, el) => ({
          metaType: $(el).attr("name"),
          metaValue: $(el).attr("content")
        })).toArray()
          .filter((data) => data?.metaType)

        return metadataList
      },
      headings(): string | WebScraping[] {
        const headingList = $("h1, h2, h3, h4, h5, h6").map((i, el) => ({
          headingTag: $(el).prop("tagName"),
          headingText: $(el).text()
        })).toArray()

        return headingList.length === 0 ? '' : headingList
      },
      tableHead(): string | WebScraping[] {
        const tableHeadList = $("th").map((i, el) => ({
          thCol: $(el).index(),
          thData: $(el).text()
        })).toArray()

        return tableHeadList.length === 0
          ? "no found th tags"
          : tableHeadList
      },
      tableData(): string | WebScraping[] {
        const tableColumnList = $("td").map((i, el) => ({
          rowID: $(el).parent().index(),
          colID: $(el).index(),
          colData: $(el).text(),
        })).toArray();

        return tableColumnList.length === 0
          ? "no found td tags"
          : tableColumnList
      },
      links(): string | WebScraping[] {
        const linkList = $("a").map((i, el) => ({
          linkPath: $(el).attr("href"),
          LinkText: $(el).text()
        })).toArray()
          .filter(({ linkPath }) => linkPath?.indexOf("#") !== 0);

        return linkList;
      },
      cites(): string | WebScraping[] {
        const citeList = $("q, blockquote").map((i, el) => ({
          citeTag: $(el).prop('tagName'),
          citeLink: $(el).attr('cite'),
          citeText: $(el).text()
        })).toArray();

        return citeList.length === 0
          ? "no found q and/or blockquote tags"
          : citeList;
      }
    }

    return scraping[opt]()
  } catch (err) {
    return (err as Error).message
  }
})
