<script setup lang="ts">
const { cost, name } = defineProps<{
  cost?: string[]
  name: string
}>()

const tcgEnegyIcon = (energyType: string) => {
  switch (energyType) {
    case 'Grass': return '/img/tcg-icons/grass.svg';
    case 'Fire': return '/img/tcg-icons/fire.svg';
    case 'Water': return '/img/tcg-icons/water.svg';
    case 'Lightning': return '/img/tcg-icons/lightning.svg';
    case 'Psychic': return '/img/tcg-icons/psychic.svg';
    case 'Fighting': return '/img/tcg-icons/fighting.svg';
    case 'Darkness': return '/img/tcg-icons/darkness.svg';
    case 'Metal': return '/img/tcg-icons/metal.svg';
    default: return '/img/tcg-icons/colorless.svg';
  }
}

const tcgEnegyColor = (energyType: string) => {
  switch (energyType) {
    case 'Grass': return 'tcg-icon-grass';
    case 'Fire': return 'tcg-icon-fire';
    case 'Water': return 'tcg-icon-water';
    case 'Lightning': return 'tcg-icon-lighting';
    case 'Psychic': return 'tcg-icon-psychic';
    case 'Fighting': return 'tcg-icon-figthing';
    case 'Darkness': return 'tcg-icon-darkness';
    case 'Metal': return 'tcg-icon-metal';
    default: return 'tcg-icon-colorless';
  }
}
</script>

<template>
  <figure class="tcg-content-attack">
    <img v-if="!!cost"
      v-for="energyType in cost" 
      :class="['tcg-icon', tcgEnegyColor(energyType)]" 
      :src="tcgEnegyIcon(energyType)" 
      alt="icon"
    />

    <stack-fa v-else :icon="['fas', 'fa-circle']" />

  </figure>
</template>