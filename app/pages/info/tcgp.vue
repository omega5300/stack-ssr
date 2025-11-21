<script setup lang="ts">
useHead({
  title: 'tcgp card info',
  meta: [
    { name: 'description', content: 'show a pokemon card detail' },
    { name: 'keywords', content: 'stack tcgp, tcgp card info, stack-analyze' },
  ],
  link: [
    { rel: 'stylesheet', href: '/css/pokemon.css' }
  ]
})

const {
  clearCardInfo, getCardInfo, tcgCardInfo, tcgID, tcgImage,
  tcgSet, tcgSetValidate, tcgSetsExpansions, tcgValidateID
} = useTcgp()
</script>

<template>
  <nuxt-layout name="info">
    <h1>tcgp card info</h1>

    <section>
      <fieldset class="input-box">
        <select class="select-field" v-model="tcgSet">
          <option value="">enter a tcgp set.</option>
          <option v-for="set in tcgSetsExpansions" :value="set">
            {{ set }}
          </option>
        </select>
        <input type="number" placeholder="enter a card id:" class="input-field" min="1" :max="TCGP_SETS[tcgSet]"
          :disabled="tcgSetValidate" v-model="tcgID" />
      </fieldset>

      <section class="btns">
        <button class="btn btn-success" @click="getCardInfo" :disabled="!tcgValidateID">start</button>
        <button class="btn btn-danger" @click="clearCardInfo"
          :disabled="Object.values(tcgCardInfo).length === 0">reset</button>
      </section>
    </section>

    <section class="glass card card__info">
      <figure class="card-header">
        <img class="card-image" :src="tcgImage" alt="card" />
        <figcaption class="card-subtitle">
          {{ tcgCardInfo.id || 'no-id' }} - type: {{ tcgCardInfo.trainerType || tcgCardInfo.types?.at(0) }}
        </figcaption>

        <h2 :class="['card-title', !!tcgCardInfo.suffix ? 'tcg-isEX' : '']">
          {{ tcgCardInfo.name || 'no card' }} {{ !!tcgCardInfo.rarity ? `- rarity: ${tcgCardInfo.rarity}` : '' }}
        </h2>

        <p v-show="tcgCardInfo.effect">{{ tcgCardInfo.effect }}</p>

        <ul role="list">
          <li v-show="tcgCardInfo.stage">
            stage: {{ tcgCardInfo.stage }} - {{ tcgCardInfo.stage !== 'Basic' ? `evolve from: ${tcgCardInfo.evolveFrom}`
              : 'pokemon basic' }}
          </li>
          <li v-show="tcgCardInfo.abilities">
            <strong class="tcg-ability">{{ tcgCardInfo.abilities?.at(0)?.name }}</strong>: {{
              tcgCardInfo.abilities?.at(0)?.effect }}
          </li>
          <li v-show="tcgCardInfo.attacks">
            <ul>
              <li class="tcg-content-info" v-for="attack in tcgCardInfo.attacks">
                <tcg-attack :cost="attack.cost" :name="attack.name" />

                <em>{{ attack.damage || 'special' }}</em>

                <p class="w-full" v-show="attack.effect">{{ attack.effect }}</p>
              </li>
            </ul>
          </li>

          <li class="tcg-content-info" v-show="tcgCardInfo.weaknesses">
            <strong>{{ tcgCardInfo.weaknesses?.at(0)?.type }}: {{ tcgCardInfo.weaknesses?.at(0)?.value }}</strong>
            <em>retreat cost:{{ tcgCardInfo.retreat }}</em>
          </li>
        </ul>
      </figure>
    </section>
  </nuxt-layout>
</template>

<style scoped>
.input-box {
  display: flex;
  gap: 8px
}
</style>