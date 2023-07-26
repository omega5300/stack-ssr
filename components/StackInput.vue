<script setup lang="ts">
interface Emits {
  (e: 'initFunction'): void;
  (e: 'clearFunction'): void;
}

interface Props {
  msg?: string;
  disabledInit: boolean;
  disabledClear: boolean;
}

const modelValue = defineModel<string>()

const emit = defineEmits<Emits>()

const { msg, disabledClear, disabledInit } = defineProps<Props>()
</script>

<template>
  <section>
    <fieldset class="input-box">
      <input 
        class="input-field" 
        type="text" 
        :placeholder="msg || 'enter a url'" 
        v-model="modelValue"
      >
    </fieldset>
    <section class="btns">
      <button class="btn btn-success" @click="emit('initFunction')" :disabled="disabledInit">start</button>
      <button class="btn btn-danger" @click="emit('clearFunction')" :disabled="disabledClear">reset</button>
    </section>
  </section>
</template>