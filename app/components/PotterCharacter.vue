<script setup lang="ts">
import type { PotterCharacter } from '#shared/interfaces/potterInterdface';

const { character } = defineProps<{
  character: PotterCharacter
}>()
</script>

<template>
  <li class="list-item">
    <section class="list-item__content">
      <figure class="list-item__figure">
        <img 
          class="list-item__poster" 
          :src="character.image" 
          :alt="character.nickname" 
        />
      </figure>
      <article class="list-item__header">
        <strong class="list-item__title">
          {{ character.fullName }} - {{ character.nickname }}
        </strong>
        <p class="list-item__subtitle">
          interpreted by: {{ character.interpretedBy }} <br>
          hogwarts house: {{ character.hogwartsHouse }}
        </p>
      </article>
      <p class="list-item__details">
        {{ character.birthdate }}
      </p>
    </section>
  </li>
</template>