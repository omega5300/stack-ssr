import type { Pagespeed } from "~~/utils/interfaces/pagespeedInterface";

type StrategyOpt = "mobile" | "desktop";

export const usePagespeed = async (url: string, strategy: StrategyOpt) => {
  const data: Pagespeed = await $fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', {
    params: {
      url, strategy
    }
  })

  return data
}