<template>
  <main class="content">
    <slot></slot>
  </main>
  <stack-tools :pages="queryPages" />
</template>