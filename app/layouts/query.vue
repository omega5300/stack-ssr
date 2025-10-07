<template>
  <main class="content">
    <slot />
  </main>
  <stack-tools :pages="queryPages" />
</template>