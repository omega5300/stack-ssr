export const useTcgp = () => {
  // static
  const tcgSetsExpansions = Object.keys(TCGP_SETS)

  // states
  const tcgSet = ref('')
  const tcgID = ref(0)
  const tcgCardInfo = ref<Partial<TcgpCard>>({})

  // computed
  const tcgSetValidate = computed(() => tcgSet.value === '')
  const tcgValidateID = computed(() => tcgID.value >= 1 && tcgID.value <= TCGP_SETS[tcgSet.value]!)
  const tcgImage = computed(
  () => !!tcgCardInfo.value.image ? `${tcgCardInfo.value.image}/high.webp` : '/img/No-image-found.jpg'
)

  // methods
  const getCardInfo = async () => {
    try {
      const data = await $fetch<TcgpCard>(
        `https://api.tcgdex.net/v2/en/sets/${tcgSet.value}/${tcgID.value}`
      )
      tcgCardInfo.value = data
    } catch (err) {
      alert((err as Error).message)
    }

    tcgSet.value = ''
    tcgID.value = 0
  }

  const clearCardInfo = () => {
    tcgCardInfo.value = {}
  }
  return {
    // static
    tcgSetsExpansions,
    // states
    tcgSet, tcgID, tcgCardInfo,
    // computed
    tcgSetValidate, tcgValidateID, tcgImage,
    // methods
    getCardInfo, clearCardInfo 
  }
}
