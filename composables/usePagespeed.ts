import { Pagespeed } from "~~/utils/interfaces/pagespeedInterface";

type StrategyOpt = "mobile" | "desktop";

export const usePagespeed = async (url: string, strategy: StrategyOpt) => {
  const data: Pagespeed = await $fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', {
    params: {
      url,
      key: 'AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0',
      strategy
    }
  })

  return data
}