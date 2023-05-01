<script setup lang="ts">
interface Emits {
  (e: 'update:modelValue', id: string): void;
  (e: 'initFunction'): void;
  (e: 'clearFunction'): void;
}

interface Props {
  msg?: string;
  modelValue: string;
  disabledInit: boolean;
  disabledClear: boolean;
}

const emit = defineEmits<Emits>()

const { modelValue, msg, disabledClear, disabledInit } = defineProps<Props>()
</script>

<template>
  <section>
    <fieldset class="input-box">
      <input class="input-field" type="text" :placeholder="msg || 'enter a url'" :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </fieldset>
    <section class="btns">
      <button class="btn btn-success" @click="emit('initFunction')" :disabled="disabledInit">start</button>
      <button class="btn btn-danger" @click="emit('clearFunction')" :disabled="disabledClear">reset</button>
    </section>
  </section>
</template>