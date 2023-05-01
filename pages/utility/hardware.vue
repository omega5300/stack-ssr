<script setup lang="ts">
import { Device, DeviceInfo } from '@capacitor/device'
import { Network, ConnectionStatus } from '@capacitor/network'

useHead({
  title: 'hardware infomation',
  meta: [
    { name: 'description', content: 'tool for check os and browser version' },
    { name: 'keywords', content: 'stack-analyze, hardware infomation, stack-analyze hardware info' }
  ],
  script: [
    { src: '/js/alert.js', body: true }
  ]
})

const hardwareElement = ref<HTMLElement | null>(null)

const modelInfo = ref<DeviceInfo>({} as DeviceInfo)
const networkInfo = ref<ConnectionStatus>({} as ConnectionStatus)
const deviceLanguage = ref('')

const init = async () => {
  try {
    modelInfo.value = await Device.getInfo()
    networkInfo.value = await Network.getStatus()
    deviceLanguage.value = (await Device.getLanguageCode()).value
  } catch (err) {
    alertMsg((err as Error).message, 'alert-danger')
  }
}

init()
</script>

<template>
  <nuxt-layout name="utility">
    <h1>hardware infomation</h1>
    <section class="glass card card__info info-hidden" ref="hardwareElement">
      <figure>
        <img class="card-image" src="/img/cpu.svg" alt="hardware img" />
        <figcaption class="card-subtitle">
          os: {{
            modelInfo.operatingSystem === "unknown"
              ? "unix"
              : modelInfo.operatingSystem
          }}
        </figcaption>
      </figure>
      <h2 class="card-title">{{ modelInfo.model }}</h2>
      <article class="card-body">
        <ul role="list" class="info-list">
          <li>
            web version: {{ modelInfo.webViewVersion || "none" }}
          </li>
          <li>
            manufacturer: {{ modelInfo.manufacturer || "no info" }}
          </li>
          <li>os version: {{ modelInfo.osVersion }}</li>
          <li>platform: {{ modelInfo.platform }}</li>
        </ul>
        <ul role="list" class="info-list">
          <li>device: {{ modelInfo.isVirtual ? 'virtual' : 'phisical' }}</li>
          <li>device language: {{ deviceLanguage }}</li>
          <li>
            connected: {{ networkInfo.connected ? 'yes' : 'no' }}
          </li>
          <li>type: {{ networkInfo.connectionType }}</li>
        </ul>
      </article>
    </section>
  </nuxt-layout>
</template>