// core module
import { config, library } from '@fortawesome/fontawesome-svg-core'

// component module
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// regular icons
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

// solid icons
import { 
  faVideoCamera, faUsersGear,
  faSpider, faTerminal, faCode, faInfo, faHome,
  faGaugeMed, faSearch, faWallet, faLock, faHandSpock, 
  faFileCode, faFilm, faDice, faRefresh, faClipboard,
  faGlobe, faGamepad, faWandMagic, faHeart,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'

// brand icons
import { 
  faGithub, faInstagram, faTiktok, 
  faCodepen, faYoutube, faTwitch, faCss3, 
  faDeezer,
} from '@fortawesome/free-brands-svg-icons'

// lib icons
const icons = [
  // common icons
  faThumbsUp, faUsersGear, faHome, faGlobe, faWandMagic, faCircle,
  // brand icons
  faGithub, faInstagram, faTiktok, faCodepen, faYoutube, faTwitch,
  faCss3, faDeezer,
  // tools icons
  faVideoCamera, faSpider, faTerminal, faCode, faInfo, faGaugeMed, 
  faSearch, faWallet, faLock, faHandSpock, faFileCode, faFilm,
  faGamepad, faHeart,
  // password generator icons
  faDice, faRefresh, faClipboard
]

// config
config.autoAddCss = false
library.add(...icons)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('stack-fa', FontAwesomeIcon)
})
