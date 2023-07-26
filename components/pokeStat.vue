<script setup lang="ts">
interface Props {
  statName: string;
  statColor: string;
  statValue: number;
  statMaxValue: number;
}

const {
  statColor,
  statMaxValue,
  statName,
  statValue
} = defineProps<Props>()
</script>

<template>
  <div class="stat">
    <span>{{ statName }}:</span>

    <progress :class="['bar', statColor]" :aria-label="statName" :max="statMaxValue" :value="statValue">
    </progress>

    <span>{{ statValue }} / {{ statMaxValue }}</span>
  </div>
</template>

<style scoped>
.bar {
  width: 76%;
}

.hp[value]::-webkit-progress-value {
  background-color: #ff0000;
}

.attack[value]::-webkit-progress-value {
  background-color: #ffff00;
}

.defense[value]::-webkit-progress-value {
  background-color: #4400ff;
}

.special-attack[value]::-webkit-progress-value {
  background-color: #0000ff;
}

.special-defense[value]::-webkit-progress-value {
  background-color: #00ff00;
}

.speed[value]::-webkit-progress-value {
  background-color: #ff00ff;
}

.xp[value]::-webkit-progress-value {
  background-color: #00ffff;
}
</style>