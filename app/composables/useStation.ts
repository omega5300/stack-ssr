export const useStations = () => {
  const audio = new Audio()

  // states
  const country = ref('')
  const stations = ref([])
  const src = ref('')
  const isPlaying = ref(false)

  // methods
  const getStations = async () => {
    if (!country.value) return alertMsg("this field is required", "alert-warn");

    try {
      stations.value = await $fetch(`https://de1.api.radio-browser.info/json/stations/bycountry/${country.value}`)
    } catch (err) {
      alertMsg((err as Error).message, 'alert-danger')
    }

    country.value = ''
  }

  const clearStation = () => {
    stations.value = []
  }

  const playRadio = (url: string) => {
    if (isPlaying.value) {
      audio.pause()
      audio.load()
    } else {
      isPlaying.value = true
    }

    audio.src = url
    audio.play()
  }

  const stopRadio = () => {
    audio.pause()
    audio.load()
    audio.src = ''
    isPlaying.value = false
  }

  return {
    country, stations, isPlaying,
    getStations, clearStation, playRadio, stopRadio,
  }
}