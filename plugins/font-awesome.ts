// core module
import { config, library } from '@fortawesome/fontawesome-svg-core'

// component module
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// regular icons
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

// solid icons
import { 
  faSun, faMoon, faVideoCamera, faUsersGear,
  faSpider, faTerminal, faCode, faInfo, faHome,
  faGaugeMed, faSearch, faWallet, faLock, faHandSpock, 
  faFileCode, faFilm, faDice, faRefresh, faClipboard,
  faGlobe
} from '@fortawesome/free-solid-svg-icons'

// brand icons
import { 
  faGithub, faInstagram, faTiktok, 
  faCodepen, faYoutube, faTwitch 
} from '@fortawesome/free-brands-svg-icons'

// lib icons
const icons = [
  // common icons
  faSun, faMoon, faThumbsUp, faUsersGear, faHome, faGlobe,
  // brand icons
  faGithub, faInstagram, faTiktok, faCodepen, faYoutube, faTwitch,
  // tools icons
  faVideoCamera, faSpider, faTerminal, faCode, faInfo, faGaugeMed, 
  faSearch, faWallet, faLock, faHandSpock, faFileCode, faFilm,
  // password generator icons
  faDice, faRefresh, faClipboard
]

// config
config.autoAddCss = false
library.add(...icons)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('stack-fa', FontAwesomeIcon)
})
